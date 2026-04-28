import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

import Checkout from './Components/Product/Checkout';
import SelectColor from './Components/Product/SelectColor';
import SelectPlan from './Components/Product/SelectPlan';
import SelectProduct from './Components/Product/SelectProduct';


const Formula = ({ user_formula, items, colors, publicKey, session, bundles, planes }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null)

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  // Páginas
  const pages = [
    { component: <SelectProduct items={items} goToNextPage={goToNextPage} bundles={bundles} />, name: 'Select Product' },
    { component: <SelectColor items={items} goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} />, name: 'Select Color' },
    { component: <SelectPlan goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} setSelectedPlan={setSelectedPlan} session={session} bundles={bundles} planes={planes} />, name: 'Select Plan' },
    { component: <Checkout formula={user_formula} publicKey={publicKey} selectedPlan={selectedPlan} goToNextPage={goToNextPage} bundles={bundles} planes={planes} session={session} />, name: 'Checkout' }
  ];

  const CurrentPageComponent = pages[currentPageIndex].component;

  return CurrentPageComponent
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Formula {...properties} />
  </Base>);
});