// Copyright (C) 2013 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @provides cajaFrameTracker
 * @overrides window
 */

var cajaFrameTracker = (function() {

  var guestWindows = [];

  return {
    addGuestWindow: addGuestWindow,
    isDefinedInCajaFrame: isDefinedInCajaFrame
  };

  function addGuestWindow(w) {
    guestWindows.push(w);
  }

  function isDefinedInCajaFrame(o) {
    var ot = typeof o;
    if (ot !== 'object' && ot !== 'function') {
      return false;  // primitive
    }
    if (o instanceof Object) {
      return true;
    }
    for (var i = 0; i < guestWindows.length; i++) {
      if (o instanceof guestWindows[i].Object) {
        return true;
      }
    }
    return false;
  }
})();

// Exports for closure compiler.
if (typeof window !== 'undefined') {
  window['cajaFrameTracker'] = cajaFrameTracker;
}
