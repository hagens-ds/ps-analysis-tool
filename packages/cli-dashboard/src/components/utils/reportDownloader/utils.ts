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
 * External dependencies
 */
import type JSZip from 'jszip';
import {
  generateCookiesWithIssuesCSV,
  generateAllCookiesCSV,
  generateSummaryDataCSV,
  generateTechnologyCSV,
  type CompleteJson,
} from '@ps-analysis-tool/common';

const generateCSVFiles = (data: CompleteJson) => {
  const allCookiesCSV = generateAllCookiesCSV(data);
  let technologyDataCSV = null;
  if (data.technologyData.length > 0) {
    technologyDataCSV = generateTechnologyCSV(data);
  }
  const cookiesWithIssuesDataCSV = generateCookiesWithIssuesCSV(data);
  const summaryDataCSV = generateSummaryDataCSV(data);

  return {
    allCookiesCSV,
    technologyDataCSV,
    cookiesWithIssuesDataCSV,
    summaryDataCSV,
  };
};

export const createZip = (analysisData: CompleteJson, zipObject: JSZip) => {
  const {
    allCookiesCSV,
    technologyDataCSV,
    cookiesWithIssuesDataCSV,
    summaryDataCSV,
  } = generateCSVFiles(analysisData);

  zipObject.file('cookies.csv', allCookiesCSV);
  if (technologyDataCSV) {
    zipObject.file('technologies.csv', technologyDataCSV);
  }
  zipObject.file('cookie-issues.csv', cookiesWithIssuesDataCSV);
  zipObject.file('report.csv', summaryDataCSV);
  zipObject.file('report.json', JSON.stringify(analysisData, null, 4));
};

export const getFolderName = (pageUrl: string) => {
  let folderName = pageUrl
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/\/+/g, '-')
    .replace(/\./g, '-');

  if (folderName.endsWith('-')) {
    const lastDashIndex = folderName.lastIndexOf('-');
    folderName = folderName.substring(0, lastDashIndex);
  }

  return folderName;
};
