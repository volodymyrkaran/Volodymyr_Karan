const TSConsoleReporter = require("jasmine-ts-console-reporter");
jasmine.getEnv().clearReporter();
jasmine.getEnv().addReporter(new TSConsoleReporter());
