import { useEffect, useState } from 'react';
import Select from 'react-select';

const VALUABLE_ITEMS = [
  {
    label: 'Cameras',
    value: 'cameras',
    iconPath: '/static/assets/Icons/cameras.svg',
  },
  {
    label: 'Jewelry',
    value: 'jewelry',
    iconPath: '/static/assets/Icons/jewelry.svg',
  },
  {
    label: 'Bikes',
    value: 'bicycles',
    iconPath: '/static/assets/Icons/bicycles.svg',
  },
  {
    label: 'Fine Arts',
    value: 'fine_arts',
    iconPath: '/static/assets/Icons/fine_arts.svg',
  },
  {
    label: 'Trading Cards',
    value: 'trading_cards',
    iconPath: '/static/assets/Icons/trading_cards.svg',
  },
  {
    label: 'Golf Equipment',
    value: 'golf_equipment',
    iconPath: '/static/assets/Icons/golf_equipment.svg',
  },
  {
    label: 'Coin Collection',
    value: 'coin_collection',
    iconPath: '/static/assets/Icons/coin_collection.svg',
  },
  {
    label: 'Stamp Collection',
    value: 'stamp_collection',
    iconPath: '/static/assets/Icons/stamp_collection.svg',
  },
  {
    label: 'Musical Instruments',
    value: 'musical_instruments',
    iconPath: '/static/assets/Icons/musical_instruments.svg', // TODO: Need new svg for this
  },
  {
    label: 'Silverware & Goldware',
    value: 'silverware_and_goldware',
    iconPath: '/static/assets/Icons/furnished_property.svg', // TODO: Replace with silverware icon
  },
  {
    label: 'Firearms',
    value: 'guns',
    iconPath: '/static/assets/Icons/guns.svg',
  },
];

const formatValuableItems = (valuableItems) => {
  if (!valuableItems) return {};

  const formDataValuableItems = {};

  for (const key in valuableItems) {
    formDataValuableItems[key] = VALUABLE_ITEMS.find((item) => {
      if (item.value === key) {
        return true;
      }
    });

    formDataValuableItems[key].limit = valuableItems[key];
  }

  return formDataValuableItems;
};

export default function ValuableItemsModal({ formData, saveData, display, setDisplay }) {
  const formDataValuableItems = formatValuableItems(formData?.valuableItems);

  const [valuableItems, setValuableItems] = useState(formDataValuableItems);
  const [focusedValuableItem, setFocusedValuableItem] = useState({ label: '', value: '', iconPath: '', limit: '' });
  const [valuableItemsActiveStep, setValuableItemsActiveStep] = useState(1);
  const [valuableItemsHaveChanged, setValuableItemsHaveChanged] = useState(false);

  useEffect(() => {
    if (Object.keys(valuableItems).length !== 0 && valuableItems.constructor === Object && valuableItemsHaveChanged) {
      saveData({ valuableItems });
    }
  }, [valuableItems]);

  useEffect(() => {
    const formDataValuableItems = formatValuableItems(formData?.valuableItems);
    setValuableItems(formDataValuableItems);
  }, [formData?.valuableItems]);

  function formatAmount(x = 0) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const changeValue = (e) => {
    setFocusedValuableItem({ ...focusedValuableItem, limit: parseInt(e.target.value, 10) });
  };

  const changeItemType = (item) => {
    setFocusedValuableItem({ ...focusedValuableItem, ...item });
  };

  const addItem = (e) => {
    e.preventDefault();
    setValuableItems({ ...valuableItems, ...{ [focusedValuableItem.value]: focusedValuableItem } });
    setValuableItemsHaveChanged(true);
    setFocusedValuableItem({ label: '', value: '', limit: '' });
    moveToValuableItemsStep(1);
  };

  const removeItem = () => {
    const { value } = focusedValuableItem;
    const newValuableItems = { ...valuableItems };
    delete newValuableItems[value];

    setValuableItems(newValuableItems);
    setValuableItemsHaveChanged(true);
    moveToValuableItemsStep(1);
  };

  const closeModal = () => {
    setDisplay('none');
    setValuableItemsActiveStep(1);
  };

  const goToEditItemStep = (item) => {
    setFocusedValuableItem(item);
    moveToValuableItemsStep(3);
  };

  const moveToValuableItemsStep = (step) => {
    setValuableItemsActiveStep(step);
  };

  const valuableItemsArray = Object.values(valuableItems);
  let newMax = 10000;
  let totalValue = 0;
  valuableItemsArray.forEach((item) => {
    newMax -= item.limit;
    totalValue += item.limit;
  });

  return (
    <div className="o-modal-screen o-dashboard-modal-screen" style={{ display }} onClick={closeModal}>
      <div className="o-dashboard-modal-contents" onClick={(e) => e.stopPropagation()}>
        <div className="o-modal-container o-dashboard-modal-container">
          <div style={{ display: valuableItemsActiveStep === 1 ? 'block' : 'none' }}>
            <button type="button" className="o-card__back-button" onClick={moveToValuableItemsStep.bind(this, 0)}>
              <img alt="arrowl" src="/static/assets/Icons/arrow_left_alt.svg" />
            </button>
            <h2 className="o-card__secondary-headline">+ Add Valuable</h2>
            <p>
              <b>Total value*:</b> ${formatAmount(totalValue)} <br /> *Must not exceed $10,000
            </p>
            <div className="o-valuable-items-container">
              {valuableItemsArray.map((item) => {
                return (
                  <button
                    type="button"
                    key={`item-${item.value}`}
                    className="o-valuable-item-btn"
                    onClick={goToEditItemStep.bind(this, item)}
                  >
                    <img src={item.iconPath} />
                  </button>
                );
              })}
              <button
                type="button"
                className="o-valuable-item-btn o-valuable-item-o-btn--add"
                onClick={moveToValuableItemsStep.bind(this, 2)}
                disabled={totalValue >= 10000}
                style={{
                  cursor: totalValue >= 10000 ? 'not-allowed' : 'pointer',
                }}
                title={totalValue >= 10000 ? 'Total value has reached $10,000' : ''}
              >
                <img alt="plus" src="/static/assets/Icons/plus.svg" />
              </button>
            </div>
          </div>
          <div style={{ display: valuableItemsActiveStep === 2 ? 'block' : 'none' }}>
            <button type="button" className="o-card__back-button" onClick={moveToValuableItemsStep.bind(this, 1)}>
              <img alt="arrowl1" src="/static/assets/Icons/arrow_left_alt.svg" />
            </button>
            <h2 className="o-card__secondary-headline">+ Add Valuable</h2>
            <div>
              <form onSubmit={addItem}>
                <label className="o-text-input__label">Type</label>
                <Select
                  value={focusedValuableItem}
                  onChange={changeItemType}
                  options={VALUABLE_ITEMS}
                  className="o-valuable-item-select"
                />
                <fieldset className="o-fieldset">
                  <label className="o-text-input__label">Estimated Value (multiples of 100)</label>
                  <input
                    className="o-text-input"
                    type="number"
                    placeholder="Enter value"
                    id="valuable-item__estimated-value"
                    step="100"
                    min="100"
                    max={newMax}
                    required
                    onChange={changeValue}
                    value={focusedValuableItem.limit}
                  />
                </fieldset>
                <button type="submit" className="o-btn o-btn--primary o-card__add-item-button">
                  <img alt="plusw" src="/static/assets/Icons/plus_white.svg" />
                  Add Item
                </button>
              </form>
            </div>
          </div>
          <div style={{ display: valuableItemsActiveStep === 3 ? 'block' : 'none' }}>
            <button type="button" className="o-card__back-button" onClick={moveToValuableItemsStep.bind(this, 1)}>
              <img alt="arrowl" src="/static/assets/Icons/arrow_left_alt.svg" />
            </button>
            <h2 className="o-card__secondary-headline">+ Edit Valuable: {focusedValuableItem.label}</h2>
            <div>
              <form onSubmit={addItem}>
                <fieldset className="o-fieldset">
                  <label className="o-text-input__label">Estimated Value (multiples of 100)</label>
                  <input
                    className="o-text-input"
                    type="number"
                    placeholder="Enter value"
                    id="valuable-item__estimated-value"
                    step="100"
                    min="100"
                    max={
                      newMax > valuableItems[focusedValuableItem.value]?.limit
                        ? newMax
                        : valuableItems[focusedValuableItem.value]?.limit + newMax
                    }
                    required
                    onChange={changeValue}
                    value={focusedValuableItem.limit}
                  />
                </fieldset>
                <div className="o-save-and-remove-container">
                  <button className="o-btn o-btn--tertiary" type="button" onClick={removeItem}>
                    <span className="o-btn--tertiary__text">Remove</span>
                  </button>
                  <button className="o-btn o-btn--primary" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
