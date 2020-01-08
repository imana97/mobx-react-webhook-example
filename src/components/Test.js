import React from "react";
import { todoStore } from "../stores";

import { observer } from "mobx-react";

/**
 * This is a to test that changing values in other components will be
 * reflected here.
 */
const Test = observer(() => <h1>{todoStore.newText}</h1>);

export default Test;
