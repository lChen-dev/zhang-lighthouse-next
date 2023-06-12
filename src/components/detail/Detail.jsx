import React, { Component } from 'react';
import MapContainer from '../map/MapContainer';
import 'datatables.net';
import 'datatables.net-bs4';
import LazyLoad from 'react-lazyload';

const ReactFitText = require('react-fittext');

function abbreviateNumber(value) {
  value = value ? value.toString() : '';
  let newValue = parseInt(
    (value.includes('.') ? value.split('.')[0] : value).replace(/\D/gm, ''),
  );
  if (value >= 1000) {
    const suffixes = ['', 'k', 'm', 'b', 't'];
    const suffixNum = Math.floor((`${value}`).length / 3);
    let shortValue = '';
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision),
      );
      const dotLessShortValue = (`${shortValue}`).replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    let shortNum;
    if (shortValue % 1 != 0) shortNum = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}
const numberWithCommas = (x) => {
  x = x || '';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertySlug: '',
      canSubmit: false,
      name: '',
      email: '',
      phone: '',
      message: '',
      unitsCheck: {},
      unitIndex: null,
      showMap: false,
    };
  }

  componentDidMount() {
    window.onload = () => {
      this.setState({ showMap: true });
    };
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  apply = async (type) => {
    const formData = document.querySelector('#modalForm');
    const data = new FormData(formData);
    data.append('type', type);
    Array.from(
      document.querySelectorAll(
        '#modalForm textarea,#modalForm input:not([type="hidden"])',
      ),
    ).map((e) => (e.value = ''));
    document.querySelector('.messageContainer').classList.remove('d-none');
    document.querySelector('.formContainer').classList.add('d-none');
    const { unitsCheck } = this.state;
    const { unitIndex } = this.state;
    if (unitIndex != null) {
      unitsCheck[unitIndex] = true;
      this.setState({ unitsCheck });
    }
  };

  render() {
    let { record } = this.props;
    record = Array.isArray(record) ? record[0] : record;
    const markers = [
      {
        id: record._id,
        lng: record.location.coordinates[0],
        lat: record.location.coordinates[1],
        srcs: record.image.map((e) => e.file),
        title: record.property_name,
        address: `${record.address} ${record.city}`,
        minPrice: record.minPrice,
        maxPrice: record.maxPrice,
        minBed:
          Object.keys(record.prices).find(
            (s) =>
              s &&
              s != null &&
              s
                .toLowerCase()
                .trim()
                .includes('studio'),
          ) != null
            ? 'Studio'
            : record.minBed,
        maxBed: record.maxBed,
        reward: record.cash_reward ? record.cash_reward : '',
        unitCount: 0,
        slug: record.slug,
        metro: record.metro,
      },
    ];

    return (
      <>
        <div className="property-page">
          <div className="container content">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="city">
                  <a href={`/rent/${record.metro}`}>
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 6.5625H3.60947L8.85956 1.31241L7.5 0L0 7.5L7.5 15L8.81237 13.6875L3.60947 8.4375H15V6.5625Z"
                        fill="black"
                      />
                    </svg>
                    {record.city}
                  </a>
                </div>
                <div className="heading">
                  <div className="text">
                    <ReactFitText compressor={0.3} maxFontSize={30}>
                      <h1 className="detailHeading">
                        <span>{record.property_name}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="26"
                          viewBox="0 0 19 26"
                          fill="none"
                        >
                          <path
                            d="M15.905 3.188V0H2.80677V3.188H0V25.504H18.7118V3.188H15.905ZM4.67796 1.594H14.0339V3.188H4.67796V1.594ZM8.42032 23.91H6.54914V20.722H8.42032V23.91ZM12.1627 23.91H10.2915V20.722H12.1627V23.91ZM16.8406 23.91H14.0339V19.128H4.67796V23.91H1.87118V4.78201H16.8406V23.91Z"
                            fill="#49454F"
                          />
                          <path
                            d="M6.54892 15.9407H4.67773V17.5346H6.54892V15.9407Z"
                            fill="#49454F"
                          />
                          <path
                            d="M10.2916 15.9407H8.42041V17.5346H10.2916V15.9407Z"
                            fill="#49454F"
                          />
                          <path
                            d="M14.0338 15.9407H12.1626V17.5346H14.0338V15.9407Z"
                            fill="#49454F"
                          />
                          <path
                            d="M6.54892 12.7524H4.67773V14.3469H6.54892V12.7524Z"
                            fill="#49454F"
                          />
                          <path
                            d="M10.2916 12.7524H8.42041V14.3469H10.2916V12.7524Z"
                            fill="#49454F"
                          />
                          <path
                            d="M14.0338 12.7524H12.1626V14.3469H14.0338V12.7524Z"
                            fill="#49454F"
                          />
                          <path
                            d="M6.54892 9.56445H4.67773V11.1582H6.54892V9.56445Z"
                            fill="#49454F"
                          />
                          <path
                            d="M10.2916 9.56445H8.42041V11.1582H10.2916V9.56445Z"
                            fill="#49454F"
                          />
                          <path
                            d="M14.0338 9.56445H12.1626V11.1582H14.0338V9.56445Z"
                            fill="#49454F"
                          />
                          <path
                            d="M6.54892 6.37622H4.67773V7.96993H6.54892V6.37622Z"
                            fill="#49454F"
                          />
                          <path
                            d="M10.2916 6.37622H8.42041V7.96993H10.2916V6.37622Z"
                            fill="#49454F"
                          />
                          <path
                            d="M14.0338 6.37622H12.1626V7.96993H14.0338V6.37622Z"
                            fill="#49454F"
                          />
                        </svg>
                      </h1>
                    </ReactFitText>
                    <span className="detailSubHeading">
                      {record.address}
                      {' '}
                      {record.detail.Amenities.PropertyInfo != null
                        ? record.detail.Amenities.PropertyInfo
                          .map((e) => ` • ${e}`)
                          .join(' ')
                        : null}
                    </span>
                    <div className="d-flex pills w-100">
                      {record.cash_reward > 0 ? (
                        <div className="infoPill d-flex">
                          <span className="marker marker-50-100" />
                          <span>
                            $
                            {abbreviateNumber(record.cash_reward)}
                            {' '}
                            Back Monthly
                          </span>
                        </div>
                      ) : null}
                      <div className="infoPill-centered d-block">
                        <b>One Month Free</b>
                        <span>Select Units</span>
                      </div>
                    </div>
                  </div>
                  <div className="property-website">
                    {record.site ? (
                      <a href={record.site}>Visit Property Website</a>
                    ) : null}
                  </div>
                </div>
                <div className="clearfix" />
                <div className="cashback box2">
                  <div className="info">
                    <h1>HOW IS LIGHTHOUSE DIFFERENT?</h1>
                    <p>
                      Earn
                      {' '}
                      {record.cash_reward
                        ? `$${parseInt(record.cash_reward) * 20}`
                        : null}
                      {' '}
                      per year renting this apartment with Lighthouse. Each
                      month you pay rent, Lighthouse puts cash in your
                      investment account. We want everyone to be able to save
                      for homeownership. Learn how it works.
                    </p>
                  </div>
                </div>
                <div className="description">
                  <h1>DESCRIPTION</h1>
                  <p>{record.detail.description}</p>
                </div>
                <div className="monthly-bill">
                  {true ? (
                    <>
                      <h1 className="mb-3">AVAILABILITY</h1>
                      <div className="tabled-toggle main">
                        {Object.keys(record.prices)
                          .filter(
                            (e) =>
                              (e.includes('Studio') || e.includes('BR')) &&
                              e.toLowerCase().endsWith('min'),
                          )
                          .map((cardBeds, i) => {
                            let name =
                              cardBeds.includes('½') ||
                              cardBeds.includes('¼') ||
                              cardBeds.includes('⅓')
                                ? cardBeds.replace(/[^⅓¼½]/gm, '')
                                : cardBeds.includes('Studio')
                                  ? 'Studio'
                                  : parseInt(cardBeds.replace(/\D/gm, ''));
                            name =
                              name != 'Studio'
                                ? name > 1
                                  ? `${name} BRs`
                                  : `${name} BR`
                                : name != 'Studio'
                                  ? `${name} BRs`
                                  : 'Studio';
                            let min = numberWithCommas(
                              record.prices[`${name.replace(/\s/gm, '')}Min`],
                            );
                            let max = numberWithCommas(
                              record.prices[`${name.replace(/\s/gm, '')}Max`],
                            );
                            if (min == '0' && max == '0') return;
                            const sqft =
                              record.prices[
                                `${name.replace(/\s/gm, '')}MinSize`
                              ];
                            const len = record.detail.units.filter((e) => (
                              e.bed.toLowerCase().trim() ==
                                  name.toLowerCase().trim() ||
                                e.bed.toLowerCase().trim() ==
                                  name
                                    .toLowerCase()
                                    .trim()
                                    .replace(/\s/gm, '')
                            ));
                            const priceArr = len
                              .map((e) =>
                                e.price != null
                                  ? e.price.includes('-')
                                    ? parseInt(
                                      e.price
                                        .split('-')[0]
                                        .replace(/\D/gm, ''),
                                    )
                                    : parseInt(e.price.replace(/\D/gm, ''))
                                  : null)
                              .filter(
                                (e) =>
                                  (e != null) & (e != '') &&
                                  e != NaN &&
                                  !Number.isNaN(e),
                              );
                            if (min == null || min == 0) {
                              min = numberWithCommas(
                                Math.min.apply(null, priceArr),
                              );
                              min = min.toLowerCase().includes('infinity')
                                ? null
                                : min;
                            }
                            if (max == null || max == 0) {
                              max = numberWithCommas(
                                Math.max.apply(null, priceArr),
                              );
                              max = max.toLowerCase().includes('infinity')
                                ? null
                                : max;
                            }
                            return (
                              <>
                                <div className="entry">
                                  <div className="list">
                                    <div className="bedM">
                                      <div className="bedC">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="14"
                                          viewBox="0 0 20 14"
                                          fill="none"
                                        >
                                          <path
                                            opacity="0.2"
                                            d="M17.5765 5V2C17.5765 0.9 16.6976 0 15.6235 0H3.90588C2.83176 0 1.95294 0.9 1.95294 2V5C0.878824 5 0 5.9 0 7V12H1.29871L1.95294 14H2.92941L3.58365 12H15.9555L16.6 14H17.5765L18.2307 12H19.5294V7C19.5294 5.9 18.6506 5 17.5765 5ZM8.78824 5H3.90588V2H8.78824V5ZM15.6235 5H10.7412V2H15.6235V5Z"
                                            fill="black"
                                          />
                                        </svg>
                                        <span>
                                          {name.includes('BR')
                                            ? name.replace(/BR|BRS/gim, 'Bed')
                                            : 'Studio'}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="m">
                                      <div className="priceC">
                                        <div className="text">
                                          {min != null && min != 0
                                            ? `$${min} -`
                                            : null}
                                          {max != null && max != 0
                                            ? ` $${max}`
                                            : null}
                                        </div>
                                      </div>
                                      {len.length > 0 ? (
                                        <>
                                          <div className="badge">
                                            <div className="toggleC">
                                              <div className="text">
                                                {len.length}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="togglerC">
                                            <i className="fa fa-chevron-down" />
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                    <div className="tableC d-none">
                                      <table className="dataTable">
                                        <thead>
                                          <tr>
                                            <th>UNIT</th>
                                            <th>SQFT</th>
                                            <th>BATHS</th>
                                            <th>AVAILABILITY</th>
                                            <th>PRICE</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {len.map((units, i) => (
                                            <>
                                              <tr>
                                                <td>
                                                  <span>
                                                    {units.name.slice(0, 4)}
                                                  </span>
                                                </td>
                                                <td>{units.size}</td>
                                                <td>
                                                  {units.bath.replace(
                                                    /\D/gm,
                                                    '',
                                                  )}
                                                </td>
                                                <td>
                                                  <div className="text">
                                                    {units.isAvailable ==
                                                      'Available Now'
                                                      ? 'Now'
                                                      : units.isAvailable ==
                                                          'Not Available'
                                                        ? 'N/A'
                                                        : units.isAvailable}
                                                  </div>
                                                </td>
                                                <td>
                                                  {units.price.includes('-')
                                                    ? units.price.split(
                                                      '-',
                                                    )[0]
                                                    : units.price}
                                                </td>
                                              </tr>
                                            </>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </>
                  ) : null}
                  <div />
                </div>
                <div className="property-details">
                  <div className="container">
                    <div className="row">
                      {Object.keys(record.detail.Amenities).map((amenity) => {
                        const heading = amenity
                          .split(/(?=[A-Z])/)
                          .map(
                            (e) =>
                              e[0].toUpperCase() + e.slice(1).toLowerCase(),
                          )
                          .join(' ');
                        const val = record.detail.Amenities[amenity];
                        if (
                          typeof val === 'string' ||
                          amenity.toLowerCase() == 'propertyinfo'
                        )
                          return;
                        return (
                          <div className="col-md-6 amenities">
                            <h1>{heading.toUpperCase()}</h1>
                            <ul className={`ul_${amenity}`}>
                              {val.map((e, k) => {
                                const t = typeof e;
                                if (t == 'string') {
                                  return (
                                    <>
                                      <li
                                        className={
                                          k <= 6
                                            ? ''
                                            : `${amenity}_hidden d-none`
                                        }
                                      >
                                        {e}
                                      </li>
                                      {val.length == k + 1 && val.length > 6 ? (
                                        <li
                                          className="d-block text-center w-100"
                                          style={{
                                            listStyle: 'none',
                                            cursor: 'pointer',
                                            height: 20,
                                          }}
                                          onClick={() => {
                                            const ico = document.querySelector(
                                              `.${amenity}_ico`,
                                            );
                                            const ul = document.querySelector(
                                              `.ul_${amenity}`,
                                            );
                                            Array.from(
                                              document.querySelectorAll(
                                                `.${amenity}_hidden`,
                                              ),
                                            ).map((el) => {
                                              if (
                                                el.classList
                                                  .toString()
                                                  .includes('d-none')
                                              ) {
                                                el.classList.remove('d-none');
                                                ico.classList.remove(
                                                  'fa-chevron-down',
                                                );
                                                ico.classList.add(
                                                  'fa-chevron-up',
                                                );
                                                ul.style.height = '300px';
                                                ul.style.overflow = 'auto';
                                              } else {
                                                el.classList.add('d-none');
                                                ico.classList.add(
                                                  'fa-chevron-down',
                                                );
                                                ico.classList.remove(
                                                  'fa-chevron-up',
                                                );
                                                ul.style.height = 'auto';
                                                ul.style.overflow = 'unset';
                                              }
                                            });
                                          }}
                                        >
                                          <i
                                            className={
                                              `${amenity
                                              }_ico fa fa-chevron-down`
                                            }
                                          />
                                        </li>
                                      ) : null}
                                    </>
                                  );
                                } if (t == 'object' && !Array.isArray(e)) {
                                  return (
                                    <li
                                      style={{
                                        listStyle: 'none',
                                        marginBottom: 20,
                                      }}
                                    >
                                      {e.heading ? (
                                        <b className="float-left w-100 d-block">
                                          {e.heading}
                                        </b>
                                      ) : null}
                                      {e.description ? (
                                        <p
                                          className="float-left w-100 d-block"
                                          style={{ marginBottom: 20 }}
                                        >
                                          {e.description}
                                        </p>
                                      ) : null}
                                      {e.list && e.list.length > 0
                                        ? e.list.map((list, k) => (
                                          <>
                                            <li
                                              className={
                                                    k <= 6
                                                      ? 'float-left w-100 d-block'
                                                      : `${amenity
                                                      }_hidden d-none`
                                                  }
                                              style={{ listStyle: 'none' }}
                                            >
                                              {list}
                                            </li>
                                          </>
                                        ))
                                        : null}
                                    </li>
                                  );
                                }
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="location">
                    <div className="map">
                      {this.state.showMap ? (
                        <MapContainer
                          markers={markers}
                          detail={'true'.toString()}
                          center
                          lat={markers[0].lat}
                          lng={markers[0].lng}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 unsetPos">
                <div className="gallery">
                  <div id="image-display">
                    <div className="button prev">
                      <svg
                        width={50}
                        height={50}
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          opacity="0.3"
                          cx={25}
                          cy={25}
                          r="24.5"
                          transform="rotate(-180 25 25)"
                          fill="black"
                          stroke="black"
                        />
                        <path
                          d="M21.7611 24.6417L30.3437 16.2907L28.3345 14.3343L17.3831 25.0002L28.3256 35.6656L30.3348 33.7091L21.761 25.3582L21.393 24.9998L21.7611 24.6417Z"
                          fill="white"
                          stroke="black"
                        />
                      </svg>
                    </div>
                    <div className="button lightbox-launcher" />
                    <div className="button next">
                      <svg
                        width={50}
                        height={50}
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          opacity="0.3"
                          cx={25}
                          cy={25}
                          r="24.5"
                          fill="black"
                          stroke="black"
                        />
                        <path
                          d="M28.2388 25.3583L19.6562 33.7093L21.6655 35.6657L32.6168 24.9998L21.6744 14.3344L19.6651 16.2909L28.239 24.6418L28.607 25.0002L28.2388 25.3583Z"
                          fill="white"
                          stroke="black"
                        />
                      </svg>
                    </div>
                    {record.image.slice(0, 1).map((e) => (
                      <a
                        href={`/static/assets/images/units/${e.file.trim()}`}
                        className="p-0 m-0 img_slider image"
                        data-toggle="lightbox"
                        data-gallery="mixedgallery"
                        data-max-width={800}
                        data-type="image"
                      >
                        <LazyLoad once>
                          <img
                            className="img-fluid"
                            src={
                                `/static/assets/images/units/${e.file.trim()}`
                              }
                          />
                        </LazyLoad>
                      </a>
                    ))}
                  </div>
                  <div className="images">
                    {record.image.slice(0, 10).map((e, k) => (
                      <a
                        href={`/static/assets/images/units/${e.file.trim()}`}
                        className={
                            `${k == 0 ? 'active ' : null}img_slider image`
                          }
                        data-toggle="lightbox"
                        data-gallery="mixedgallery"
                        data-max-width={800}
                        data-type="image"
                      >
                        <LazyLoad once>
                          <img
                            src={
                                `/static/assets/images/units/${e.file.trim()}`
                              }
                            className="img img-fluid"
                            width={150}
                          />
                        </LazyLoad>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="clearfix" />
                <div className="schedule-form">
                  <i className="closePopup fa fa-times" />
                  <div className="messageContainer d-none">
                    <h1>Thank you</h1>
                  </div>
                  <div className="formContainer">
                    {/* <span>Lighthouse Concierge</span> */}
                    <h1>Interested in this apartment?</h1>
                    <p>
                      Lighthouse can guide you. We’ll help schedule a visit to
                      any apartment on our site that you like. We want apartment
                      seeking to be less stress and more rewards. With our
                      dedicated team here to help, say goodbye to email tag and
                      hello to your new place.
                    </p>
                    <form
                      method="POST"
                      id="modalForm"
                      className="toggle-disabled"
                    >
                      <input
                        type="hidden"
                        name="listing"
                        defaultValue={record.property_name}
                        required
                        data-validation="required"
                        data-validation-event="keyup change"
                      />
                      <input
                        type="hidden"
                        name="metro"
                        defaultValue={record.metro}
                        required
                        data-validation="required"
                        data-validation-event="keyup change"
                      />
                      <input
                        type="hidden"
                        name="slug"
                        defaultValue={record.slug}
                        required
                        data-validation="required"
                        data-validation-event="keyup change"
                      />
                      <input
                        type="hidden"
                        name="unit"
                        defaultValue=""
                        className="inpUnit"
                      />
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Name here"
                          className="nameInp"
                          autoComplete={'false'.toString()}
                          required
                          data-validation="required string"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Your email</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter Email here"
                          className="emailInp"
                          autoComplete={'false'.toString()}
                          required
                          data-validation="required email"
                          data-validation-event="keyup change"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Your Phone</label>
                        <input
                          type="text"
                          name="phone"
                          className="phone mask"
                          placeholder="+1 (212) 123-4567"
                          autoComplete={'false'.toString()}
                          required
                          maxLength={17}
                          data-validation="required length"
                          data-validation-length="max17"
                          data-validation-event="keyup change"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                          name="message"
                          placeholder={
                            `I'm interested in a unit at new ${
                              record.property_name
                            }. Please contact me. `
                          }
                          rows={3}
                          defaultValue=""
                          className="messageInp"
                        />
                      </div>
                      <div className="form-group d-flex" />
                      <div className="form-group">
                        <button
                          type="button"
                          role="button"
                          name="submit"
                          onClick={() => this.apply('schedule')}
                          value="submit"
                        >
                          Schedule a visit
                        </button>
                        <button
                          type="button"
                          role="button"
                          name="submit"
                          onClick={() => this.apply('direct')}
                          className="directApplyBtn"
                          value="submit"
                        >
                          Apply Direct
                        </button>
                      </div>
                    </form>
                    <p>
                      Remember, to earn cash back, you have to apply for this
                      apartment through the Lighthouse website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Detail;
