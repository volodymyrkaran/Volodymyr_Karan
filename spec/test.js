const { Builder, By, until } = require("selenium-webdriver");

require("chromedriver");
const driver = new Builder().forBrowser("chrome").build();

const baseUrl = "https://opensource-demo.orangehrmlive.com";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50 * 1000;

const waitPageLoad = async (element, page) => {
  await driver.wait(until.elementLocated(element), 20 * 1000);
  console.log(`${page} page is loaded.`);
};

const loginToOrangeHrmLiveAsAdmin = async () => {
  await driver.get(`${baseUrl}/web/index.php/auth/login`);

  const usernameInput = By.css(".orangehrm-login-form input[name='username']");
  const passwordInput = By.css(".orangehrm-login-form input[name='password']");
  const loginButton = By.css(".orangehrm-login-form button[type='submit']");

  await waitPageLoad(loginButton, "Login");

  await driver.findElement(usernameInput).sendKeys("Admin");
  await driver.findElement(passwordInput).sendKeys("admin123");
  await driver.findElement(loginButton).click();
  console.log("User is signed in as admin.");

  const dashboardLink = By.xpath("//a/span[normalize-space()='Dashboard']");

  await waitPageLoad(dashboardLink, "Dashboard");
};

const navigateToAdminPage = async () => {
  const adminLink = By.xpath("//a/span[normalize-space()='Admin']");
  await driver.findElement(adminLink).click();

  const pageTitle = By.xpath("//h6[normalize-space()='Admin']");
  await waitPageLoad(pageTitle, "Admin");
};

const navigateToJobPage = async () => {
  const jobSelectInput = By.xpath(
    "//li/span[contains(normalize-space(),'Job')]"
  );
  await driver.findElement(jobSelectInput).click();

  const jobTitlesLink = By.xpath("//ul/li/a[normalize-space()='Job Titles']");
  await driver.findElement(jobTitlesLink).click();

  const pageTitle = By.xpath("//h6[normalize-space()='Job Titles']");
  await waitPageLoad(pageTitle, "Admin / Job");
};

const navigateToAddJobPage = async () => {
  const addButton = By.css(".orangehrm-header-container button");
  await driver.findElement(addButton).click();

  const pageTitle = By.xpath("//h6[normalize-space()='Add Job Title']");
  await waitPageLoad(pageTitle, "Add Job Title");
};

const findElement = async (path, elementName) => {
  return await driver
    .findElement(path)
    .then((element) => element)
    .catch((e) => console.log(`${elementName} is not present.`));
};

describe("Job Titles", () => {
  beforeEach(async () => {
    await loginToOrangeHrmLiveAsAdmin();

    await navigateToAdminPage();
    await navigateToJobPage();
    await navigateToAddJobPage();
  });

  describe("when user is signed in as admin", () => {
    it("should be able to add job titles and remove them", async () => {
      const jobTitleInput = By.css(".oxd-form input");
      const jobDescriptionTextArea = By.css(
        ".oxd-form textarea[placeholder='Type description here']"
      );
      const noteTextArea = By.css(".oxd-form textarea[placeholder='Add note']");
      const saveButton = By.xpath("//button[normalize-space()='Save']");

      const sampleJobTitle = "Circus Clown";
      const sampleJobDescription = "Should make people laugh";
      const sampleNote = "Remote is not possible";

      await driver.findElement(jobTitleInput).sendKeys(sampleJobTitle);
      await driver
        .findElement(jobDescriptionTextArea)
        .sendKeys(sampleJobDescription);
      await driver.findElement(noteTextArea).sendKeys(sampleNote);
      await driver.findElement(saveButton).click();

      const table = By.xpath(
        "//div[contains(@class, 'oxd-table-header-cell')]"
      );
      await driver.wait(until.elementLocated(table), 20 * 1000);
      console.log("Table is loaded.");

      const addedJobTitle = By.xpath(
        `//div[contains(text(), '${sampleJobTitle}')]`
      );
      const addedJobDescription = By.xpath(
        `//div[contains(text(), '${sampleJobDescription}')]`
      );

      const createdJobTitle = await findElement(addedJobTitle, "Job Title");
      const createdJobDescription = await findElement(
        addedJobDescription,
        "Job Description"
      );
      expect(createdJobTitle && createdJobDescription).toBeDefined();

      const createdJobCheckbox = By.xpath(
        `//div[contains(normalize-space(), '${sampleJobTitle}')]/preceding::i`
      );
      const foundedInputs = await driver.findElements(createdJobCheckbox);
      await foundedInputs[foundedInputs.length - 1].click();

      const deleteSelectedButton = By.xpath(
        "//button[contains(normalize-space(), 'Delete Selected')]"
      );
      await driver.findElement(deleteSelectedButton).click();

      const approveDeletionButton = By.xpath(
        "//button[contains(normalize-space(), 'Yes, Delete')]"
      );
      await driver.findElement(approveDeletionButton).click();
      console.log("Newly created Job was deleted.");

      const deletedJobTitle = await findElement(addedJobTitle, "Job Title");
      const deletedJobDescription = await findElement(
        addedJobDescription,
        "Job Description"
      );
      expect(deletedJobTitle && deletedJobDescription).not.toBeDefined();
    });
    afterEach(() => driver.quit());
  });
});
