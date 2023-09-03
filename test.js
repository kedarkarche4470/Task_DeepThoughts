import { Selector, ClientFunction } from 'testcafe';

const getPageTitle = ClientFunction(() => document.title);

fixture`Login Tests`
    .page`https://dev.deepthought.education/login`; 

test('Successful Login', async (t) => {
    await t.wait(10000);
    const usernameInput = Selector('input[name="username"]');
    const passwordInput = Selector('input[name="password"]');
    const loginButton = Selector('button[type="submit"]');

    await t
        .typeText(usernameInput, 'kedar_karche')
        .typeText(passwordInput, 'Kedar@123')
        .click(loginButton);
    
    await t.wait(3000);

    const pageTitle = await getPageTitle();
    await t.expect(pageTitle).contains('Welcome to DeepThought | DeepThought');
});

test('Unsuccessful Login Attempts', async (t) => {
    await t.wait(7000);
    const usernameInput = Selector('input[name="username"]');
    const passwordInput = Selector('input[name="password"]');
    const loginButton = Selector('button[type="submit"]');

    // Attempt 1: Invalid username
    const errorContainer = Selector('.alert.alert-danger');

    await t
        .typeText(usernameInput, 'invalid_username')
        .typeText(passwordInput, 'Kedar@123')
        .click(loginButton)
        .expect(errorContainer.exists).ok()
        .expect(errorContainer.visible).ok()
        .expect(errorContainer.innerText)
        .contains('\nLogin Unsuccessful\n\nInvalid login credentials');
    await t.wait(3000);

    await t.eval(() => location.reload(true));

    // Attempt 2: Invalid password
    await t
        .typeText(usernameInput, 'kedar_karche')
        .typeText(passwordInput, 'invalid_password')
        .click(loginButton)
        .expect(errorContainer.exists).ok()
        .expect(errorContainer.visible).ok()
        .expect(errorContainer.innerText)
        .contains('\nLogin Unsuccessful\n\nInvalid login credentials');
});

test('Validate Error Messages', async (t) => {
    await t.wait(7000);
    const usernameInput = Selector('input[name="username"]');
    const passwordInput = Selector('input[name="password"]');
    const loginButton = Selector('button[type="submit"]');

    // Attempt 1: Invalid username
    const errorContainer = Selector('.alert.alert-danger');

    await t
        .typeText(usernameInput, 'invalid_username')
        .typeText(passwordInput, 'Kedar@123')
        .click(loginButton)
        .expect(errorContainer.exists).ok()
        .expect(errorContainer.visible).ok()
        .expect(errorContainer.innerText)
        .contains('\nLogin Unsuccessful\n\nInvalid login credentials');
    await t.wait(3000);
    
    await t.eval(() => location.reload(true));
        

    // Attempt 2: Invalid password
    await t
        .typeText(usernameInput, 'kedar_karche')
        .typeText(passwordInput, 'invalid_password')
        .click(loginButton)
        .expect(errorContainer.exists).ok()
        .expect(errorContainer.visible).ok()
        .expect(errorContainer.innerText)
        .contains('\nLogin Unsuccessful\n\nInvalid login credentials');
});

test('Redirect to Dashboard', async (t) => {
    await t.wait(7000);
    const usernameInput = Selector('input[name="username"]');
    const passwordInput = Selector('input[name="password"]');
    const loginButton = Selector('button[type="submit"]');

    await t
        .typeText(usernameInput, 'kedar_karche')
        .typeText(passwordInput, 'Kedar@123')
        .click(loginButton);

    const pageTitle = await getPageTitle();
    await t.expect(pageTitle).contains('Welcome to DeepThought | DeepThought');
});
