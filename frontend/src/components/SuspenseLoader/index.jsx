import React, { Suspense } from "react";
import Center from "components/Center";
import Loader from "components/Loader";

const SuspenseLoader = ({ children }) => (
  <Suspense
    fallback={
      <Center>
        <Loader />
      </Center>
    }
  >
    {children}
  </Suspense>
);

export default SuspenseLoader;
