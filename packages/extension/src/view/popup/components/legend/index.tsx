/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import {
  Matrix,
  type MatrixComponentProps,
} from '../../../design-system/components';
import { type Legend as LegendProp } from '../../../devtools/cookies.types';

interface LegendProps {
  legendItemList: LegendProp[];
}

const Legend = ({ legendItemList }: LegendProps) => {
  const dataComponents: MatrixComponentProps[] = legendItemList.map(
    ({ label, count, color, countClassName }) => {
      return {
        color,
        title: label,
        count,
        countClassName: countClassName,
        containerClasses: '',
      };
    }
  );

  return <Matrix dataComponents={dataComponents} />;
};

export default Legend;