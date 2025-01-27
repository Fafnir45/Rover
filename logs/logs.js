const logComponent = {
    logContainer: null,
    severityFilter: "info",
  
    init: function () {
      this.logContainer = $("#log-container");
  
      $("#log-filter").on("change", (event) => {
        this.severityFilter = event.target.value;
        this.filterLogs();
      });
    },
  
    log: function (message, severity = "info") {
      const severityClass = `log-${severity}`;
      const logEntry = $(`<div class="log-entry ${severityClass}" data-severity="${severity}">${message}</div>`);
      this.logContainer.append(logEntry);
      this.logContainer.scrollTop(this.logContainer[0].scrollHeight);
      this.filterLogs();
    },
  
    filterLogs: function () {
      $(".log-entry").each((_, entry) => {
        const logSeverity = $(entry).data("severity");
        const allowedSeverities = this.getAllowedSeverities();
  
        if (allowedSeverities.includes(logSeverity)) {
          $(entry).show();
        } else {
          $(entry).hide();
        }
      });
    },
  
    getAllowedSeverities: function () {
      switch (this.severityFilter) {
        case "fatal":
          return ["fatal"];
        case "warning":
          return ["fatal", "warning"];
        case "info":
        default:
          return ["fatal", "warning", "info"];
      }
    },
  };
  
  $(document).on("logs-loaded", function () {
    logComponent.init();
  });
  