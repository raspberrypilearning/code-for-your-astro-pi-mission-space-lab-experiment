function toggleSteps(checked, css_class) {
  /**
   * Show/hide the associated steps
  */
  const steps = document.querySelectorAll(css_class);
  if (checked) {
    // show the class
    steps.forEach((step) => step.style.display = "block");
  } else {
    // hide
    steps.forEach((step) => step.style.display = "none");
  }
}

function getChangeHandler(checkbox_id, css_class) {
  return (event) => {
    // persist the checkbox into localstorage
    var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {};
    checkboxValues[checkbox_id] = event.target.checked;
    const ttlInMs = 1000 * 60 * 60 * 24 // 24 hours
    checkboxValues["expiry"] = new Date().getTime() + ttlInMs
    localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));

    // show/hide the associated steps
    toggleSteps(event.target.checked, css_class);
    toggleSteps(!event.target.checked, ".not_" + css_class.slice(1));
  }
}

var checkboxes = ["hasCamera", "hasInfrared", "hasPir", "hasCoral"];
var cssClasses = [".camera_step", ".infrared_step", ".pir_step", ".coral_step"];

for (let i = 0; i < checkboxes.length; i++) { 
  const checkbox = document.getElementById(checkboxes[i]);
  const cssClass = cssClasses[i];
  checkbox.addEventListener('change', getChangeHandler(checkboxes[i], cssClass));
  // initialise the checkbox state based on localstorage
  const checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {};
  // check expiry
  if ('expiry' in checkboxValues && 
      checkboxValues['expiry'] < new Date().getTime()) {
    localStorage.removeItem('checkboxValues')
    checkboxValues = {}
    toggleSteps(false, css_class);
    toggleSteps(true, ".not_" + css_class.slice(1));
  } else if (checkboxes[i] in checkboxValues) {
    checkbox.checked = checkboxValues[checkboxes[i]]; 
    toggleSteps(checkboxValues[checkboxes[i]], cssClass);
    toggleSteps(!checkboxValues[checkboxes[i]], ".not_" + cssClass.slice(1));
  }
}
