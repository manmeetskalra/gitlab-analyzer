jest.setTimeout(300000);

const REACT_APP_DEVHOST = process.env.REACT_APP_DEVHOST || 'http://localhost:8080';
const GITLAB_HOST = process.env.GITLAB_HOST || 'http://cmpt373-1211-14.cmpt.sfu.ca:8929/';

describe('Simple Browser Tests', () => {
  beforeAll(async () => {
    await page.goto(REACT_APP_DEVHOST);
  });

  it('can open project', async () => {
    await expect(page).toFill('#username', 'admin');
    await expect(page).toFill('#password', '1234');
    await expect(page).toClick('#login');
    await expect(page).toMatch('Server information');
    await expect(page).toFill('#url', `${GITLAB_HOST}root/naufal-276`);
    await expect(page).toFill('#token', 'XQUSyUSDiQUxsy6CoP8_');
    await expect(page).toClick('#create-config');
    await expect(page).toMatch('Project Name', { timeout: 60000 });

    const row = await expect(page).toMatchElement('.MuiDataGrid-row', { text: 'naufal-276' });
    const checkbox = await row.$('input[type="checkbox"]');
    await checkbox.evaluate(checkbox => checkbox.click());
    await expect(page).toClick('#select-project');
    await expect(page).toMatch('Project Overview', { timeout: 60000 });
  });
});