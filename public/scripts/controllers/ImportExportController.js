googleAuthApp.controller('importExportController', ['importExportService', function (importExportService) {
  console.log('loaded importExportController');
  const vm = this;

  var reader;
  var progress = document.querySelector('.percent');

  vm.interns = importExportService.interns;
  vm.uploadInterns = importExportService.uploadInterns;
  vm.importInterns = importExportService.importInterns;

  vm.exportResponseData = importExportService.exportResponseData;

  vm.searchByLastName = importExportService.searchByLastName;
  vm.lastNameIn = importExportService.lastNameIn;
  vm.lastNameMatch = importExportService.lastNameMatch;

  vm.removeIntern = importExportService.removeIntern;
  vm.editPhone = importExportService.editPhone;
  vm.showConfirm = importExportService.showConfirm;
  vm.confirm = importExportService.confirm;

  function abortRead() {
    reader.abort();
  }

  function errorHandler(fileEvent) {
    switch(fileEvent.target.error.code) {
      case fileEvent.target.error.NOT_FOUND_ERR:
      alert('File Not Found!');
      break;
      case fileEvent.target.error.NOT_READABLE_ERR:
      alert('File is not readable');
      break;
      case fileEvent.target.error.ABORT_ERR:
      break;
      default:
      alert('An error occurred reading this file.');
    };
  }

  function updateProgress(fileEvent) {
    // fileEvent is an ProgressEvent.
    if (fileEvent.lengthComputable) {
      var percentLoaded = Math.round((fileEvent.loaded / fileEvent.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = 'Importing data ' + percentLoaded + '%';
      }
    }
  }

  function handleFileSelect(fileEvent) {
    // Reset progress indicator on new file selection.
    progress.style.width = '0%';
    progress.textContent = 'Importing data 0%';

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function(readerEvent) {
      alert('File read cancelled');
    };
    reader.onloadstart = function(readerEvent) {
      document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(readerEvent) {
      // Ensure that the progress bar displays 100% at the end.
      progress.style.width = '100%';
      progress.textContent = 'Importing data 100%';
      setTimeout("document.getElementById('progress_bar').className='';", 2000);

      // sends read file to factory function
      importExportService.sendCSV(readerEvent.target.result);
    }

    // Read in the file as a text string.
    reader.readAsText(fileEvent.target.files[0]);
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

}]); //end importExportController
