import config from '../config';
import kymaConsole from '../commands/console';
import request from 'request';

module.exports = {
  createInstance: async (page, instanceTitle, instanceLabel) => {
    try {
      const addToEnvButton = `[${config.catalogTestingAtribute}="add-to-env"]`;
      const modal = '.ReactModal__Content--after-open';
      const nameServiceInstancesInput = `[name="nameServiceInstances"]`;
      const labels = `[name="nameServiceBindingUsage"]`;
      const modalCreate = `[${config.catalogTestingAtribute}="modal-create"]`;

      const frame = await kymaConsole.getFrame(page);
      await frame.click(addToEnvButton);
      await frame.waitForSelector(modal, { visible: true });

      const classTitle = await frame.$(nameServiceInstancesInput);

      await classTitle.focus();
      await classTitle.click({ clickCount: 3 });
      await classTitle.type(instanceTitle);

      const classLabel = await frame.$(labels);

      await classLabel.focus();
      await classLabel.click({ clickCount: 3 });
      await classLabel.type(instanceLabel);

      const create = await frame.waitForSelector(modalCreate);
      await create.click();
    } catch (e) {
      console.log(document.documentElement.innerHTML);
      throw e;
    }
  },
  feelInInput: async (frame, searchByText, searchId) => {
    try {
      const searchSelector = `[${config.catalogTestingAtribute}=${searchId}]`;
      const searchInput = await frame.$(searchSelector);
      await searchInput.focus();
      await searchInput.click({ clickCount: 3 });
      await searchInput.type(searchByText);
    } catch (e) {
      console.log(document.documentElement.innerHTML);
      throw e;
    }
  },
  getInstances: async page => await getElements(page, 'instance-name'),
  getServices: async page => await getElements(page, 'card-title'),
  getFilters: async page => await getElements(page, 'filter-item'),
  prepareSelector: name => `[${config.catalogTestingAtribute}="${name}"]`
};

async function getElements(page, e2eIdName) {
  try {
    return await page.evaluate(
      (config, e2eIdName) => {
        const elementArraySelector = `[${
          config.catalogTestingAtribute
        }=${e2eIdName}]`;
        const elements = Array.from(
          document.querySelectorAll(elementArraySelector)
        );
        return elements.map(item => item.textContent);
      },
      config,
      e2eIdName
    );
  } catch (e) {
    console.log(document.documentElement.innerHTML);
    throw e;
  }
}
