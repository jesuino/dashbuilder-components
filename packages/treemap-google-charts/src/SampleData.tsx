/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const SampleData: Array<Array<string | number | null>> = [
  ["ID", "Parent", "Number Of Lines"],
  ["Shakespeare", null, 0],
  ["Comedies", "Shakespeare", null],
  ["Tragedies", "Shakespeare", null],
  ["Histories", "Shakespeare", null],
  ["As You Like It", "Comedies", null],
  ["Adam", "As You Like It", 10],
  ["Amiens", "As You Like It", 10],
  ["Audrey", "As You Like It", 12],
  ["Celia", "As You Like It", 108],
  ["Charles", "As You Like It", 8],
  ["Comedy Of Errors", "Comedies", null],
  ["Adriana", "Comedy Of Errors", 79],
  ["Aegeon", "Comedy Of Errors", 17],
  ["Aemilia", "Comedy Of Errors", 16],
  ["Angelo", "Comedy Of Errors", 31],
  ["Merchant Of Venice", "Comedies", null],
  ["Antonio", "Merchant Of Venice", 47],
  ["Balthasar", "Merchant Of Venice", 1],
  ["Bassanio", "Merchant Of Venice", 73],
  ["Duke (of Venice)", "Merchant Of Venice", 18],
  ["Gratiano", "Merchant Of Venice", 48],
  ["Midsummer Night's Dream", "Comedies", null],
  ["Bottom", "Midsummer Night's Dream", 59],
  ["Cobweb", "Midsummer Night's Dream", 4],
  ["Demetrius", "Midsummer Night's Dream", 48],
  ["Egeus", "Midsummer Night's Dream", 7],
  ["Fairy", "Midsummer Night's Dream", 4],
  ["The Tempest", "Comedies", null],
  ["Adrian", "The Tempest", 9],
  ["Alonso", "The Tempest", 40],
  ["Antonio, duke of Milan", "The Tempest", 57],
  ["Ariel", "The Tempest", 45],
  ["Henry VIII", "Histories", null],
  ["Anne Bullen", "Henry VIII", 18],
  ["Archbishop Cranmer", "Henry VIII", 21],
  ["Bishop Lincoln", "Henry VIII", 2],
  ["Brandon", "Henry VIII", 6]
];
