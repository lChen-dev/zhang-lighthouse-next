import { createHttpClient } from '@utils/http';

interface Props {
  setShowEmailClientModal: any;
  clientList: Array<any>;
}

const EmailClientModal = ({ setShowEmailClientModal, clientList }: Props) => {
  const sendEmail = async (e: any) => {
    e.preventDefault();

    // Grab all of our inputs and textarea
    const inputs = e.target.querySelectorAll('input');
    const textarea = e.target.querySelector('textarea');

    // Map inputs to properties on post object
    const postObject: any = {};
    inputs.forEach((input: any) => {
      postObject[input.name] = input.value;
    });
    postObject.message = textarea.value;

    // Add the client list as an array of IDs to the post object
    const propertyIds = clientList.map((property) => property.id);
    postObject.propertyIds = propertyIds;

    // Send a POST Request to /slocator
    const client = createHttpClient('');
    await client
      .request({ url: '/slocator', data: postObject, method: 'POST' })
      .finally(() => {
        setShowEmailClientModal(false);
      });
  };

  return (
    <>
      {/* This parent div closes out the modal, and there isn't an interactive role that applies */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={(): void => setShowEmailClientModal(false)}
        onKeyDown={(): void => setShowEmailClientModal(false)}>
        {/* clicking this parent div shouldn't close the modal. Therefore we stopPropagation. */}
        {/* There is no interactive role that applies. */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className="relative w-full my-6 mx-auto max-w-3xl"
          onClick={(e): void => e.stopPropagation()}
          onKeyDown={(e): void => e.stopPropagation()}
        >
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">Email Client</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={(): void => setShowEmailClientModal(false)}
                type="button"
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* body */}
            <form onSubmit={sendEmail}>
              <div className="relative p-6 flex-auto">
                <h3 className="font-semibold text-lg">Locator</h3>
                <hr className="mb-2" />
                <div className="w-full flex justify-between space-x-2 mb-4">
                  <div className="content-center relative w-6/12">
                    <label
                      className="block mb-1"
                      htmlFor="locatorName"
                    >
                      Name
                      <input
                        name="locatorName"
                        id="locatorName"
                        className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 w-full"
                        placeholder="Full Name"
                      />
                    </label>
                  </div>
                  <div className="content-center relative w-6/12">
                    <label
                      className="block mb-1"
                      htmlFor="locatorEmail"
                    >
                      Email
                      <input
                        name="locatorEmail"
                        id="locatorEmail"
                        className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 w-full"
                        placeholder="Email"
                      />
                    </label>
                  </div>
                </div>
                <h3 className="font-semibold text-lg">Client</h3>
                <hr className="mb-2" />
                <div className="w-full flex justify-between space-x-2 mb-4">
                  <div className="content-center relative w-6/12">
                    <label
                      className="block mb-1"
                      htmlFor="clientFirstName"
                    >
                      First Name
                      <input
                        name="clientFirstName"
                        id="clientFirstName"
                        className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 w-full"
                        placeholder="First Name"
                      />
                    </label>
                  </div>
                  <div className="content-center relative w-6/12">
                    <label
                      className="block mb-1"
                      htmlFor="clientLastName"
                    >
                      Last Name
                      <input
                        name="clientLastName"
                        id="clientLastName"
                        className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 w-full"
                        placeholder="Last Name"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full flex justify-between space-x-2 mb-4">
                  <div className="content-center relative w-6/12">
                    <label
                      className="block mb-1"
                      htmlFor="clientEmail">
                      Email
                      <input
                        name="clientEmail"
                        id="clientEmail"
                        className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 w-full"
                        placeholder="Email"
                      />
                    </label>
                  </div>
                  <div className="content-center relative w-6/12">
                    <label
                      className="block mb-1"
                      htmlFor="clientPreferences"
                    >
                      Preferences
                      <input
                        name="clientPreferences"
                        id="clientPreferences"
                        className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 w-full"
                        placeholder="Preferences"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full flex justify-between space-x-2 mb-4">
                  <div className="content-center relative w-full">
                    <label
                      className="block mb-1"
                      htmlFor="message"
                    >
                      Message
                      <textarea
                        name="message"
                        id="message"
                        className="z-10 rounded-r-md rounded-l-md flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 transition ease-in-out duration-150 w-full"
                        placeholder="Message"
                        rows={10}
                      />
                    </label>
                  </div>
                </div>
              </div>
              {/* footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="text-indigo-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={(): void => setShowEmailClientModal(false)}
                >
                  Save Changes
                </button>
                <button
                  className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  style={{ transition: 'all .15s ease' }}
                  type="submit"
                >
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
};

export default EmailClientModal;
