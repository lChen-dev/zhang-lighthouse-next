import { useState } from 'react';
import Head from 'next/head';
import { useAnalytics } from 'use-analytics';

export default function Confirm({ formData, saveData, stepPath, nextStep }) {
  const { track } = useAnalytics();

  const [email, setEmail] = useState(formData?.email);
  const onSubmit = async (e) => {
    e.preventDefault();
    saveData({ email });

    // // Send an API call to our backend to initiate an email verification
    // webAuth.passwordlessStart(
    //   {
    //     connection: 'email',
    //     send: 'link',
    //     email,
    //   },
    //   function(err, res) {
    //     // handle errors or continue
    //     if (err) {
    //       console.warn(err)
    //     } else {
    //       console.log({ res })
    //     }
    //   },
    // );
  };
  return (
    <div>
      <Head>
        <title>Confirm your email. It's where we will send your policy. | Lighthouse Insurance</title>
      </Head>
      <div className="l-form-header">
        <h1>Confirm your email. It's where we will send your policy.</h1>
        <p>
          After this, you can add an Interested Party, such as a landlord. We’ll update them with your proof of
          insurance and keep them in the loop if you decide to move.
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="o-confirm-email__field">
          <fieldset className="o-fieldset">
            <label className="o-text-input__label">Email</label>
            <input
              className="o-text-input"
              type="text"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
        </div>
        <div className="l-next-container">
          <button className="o-btn o-btn--primary">
            <span className="o-btn--primary__text">Verify</span>
            <img src="/static/assets/Icons/arrow_right.svg" />
          </button>
        </div>
      </form>
    </div>
  );
}
