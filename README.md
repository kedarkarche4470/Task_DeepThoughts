# 1) Test Automation Strategy

## a) Objective
**Objective**: The primary objective of test automation is to ensure the reliability and functionality of the login feature of the web application, "DeepThought." This includes both positive and negative scenarios to validate user login behavior.

## b) Scope
**Scope of Automation**: The scope of automation covers the login functionality of the web application, focusing on end-to-end testing. This includes scenarios for successful login, unsuccessful login attempts, error message validation, and dashboard redirection.

## c) Tools
**Testing Framework**: TestCafe is the chosen testing framework for automation. It is used for its cross-browser compatibility and ease of use.

**Test Execution**: Tests are executed using the TestCafe command-line interface (npx testcafe) to run them on multiple browsers (Chrome and Edge).


## d) Reporting
**Test Results**: TestCafe provides detailed test results, including pass/fail statuses, executed steps, and error messages, in the command-line output.

**Defect Reporting**: When a test fails, defects are reported in the project's defect tracking system, including details about the failure, steps to reproduce, and related artifacts.



# 2) Test Automation Framework Description

## a) Framework Selection

**- Test Automation Framework**: The chosen test automation framework for this project is TestCafe.

**- Reasons for Selection**: TestCafe was selected for its unique features, including cross-browser compatibility, ease of use, and the ability to run tests on various platforms without the need for additional browser drivers. TestCafe's open-source nature and active community support also contributed to the decision.

## b) Framework Architecture
**- Architecture**: TestCafe follows a client-server architecture. The client is responsible for test scripting, while the server manages browser automation. It allows for parallel test execution on multiple browsers.

**- Cross-Browser Support**: TestCafe's architecture enables it to support various browsers, making it suitable for testing web applications across different environments.

## c) Coding Standards and Naming Conventions
**- Coding Standards**: The code follows industry-standard JavaScript coding practices. This includes proper indentation, code modularity, and meaningful variable and function names.

**- Naming Conventions**: Meaningful and descriptive variable and selector names are used for clarity and maintainability. For example:

1. username : Input for the username input field.
2. password : Input for the password input field.
3. loginButton : for the login button.
4. errorContainer : for the error message container.



# 3) Test Scripts

## Test Script 1: Successful Login

**Purpose**: This script validates the successful login of a user with valid credentials.

**Input**: Valid username and password.

**Expected Output**: The user is successfully logged in and redirected to the dashboard screen.

    // Test script for Successful Login
    test('Successful Login', async (t) => {
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


## Test Script 2: Unsuccessful Login Attempts

**Purpose**: This script tests unsuccessful login attempts with invalid credentials.

**Input**: Invalid username and password.

**Expected Output**: The login attempts fail, and appropriate error messages are displayed.

    // Test script for Unsuccesful Login 
    test('Unsuccessful Login Attempts', async (t) => {
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
            await t.pressKey('f5');

        // Attempt 2: Invalid password
        await t
            .typeText(usernameInput, 'invalid_username')
            .typeText(passwordInput, 'Kedar@123')
            .click(loginButton)
            .expect(errorContainer.exists).ok()
            .expect(errorContainer.visible).ok()
            .expect(errorContainer.innerText)
            .contains('\nLogin Unsuccessful\n\nInvalid login credentials');
            await t.wait(3000);
    });

## Test Script 3: Validate Error Messages

**Purpose**: This script validates that appropriate error messages are displayed for invalid login attempts.

**Input**: Various combinations of invalid usernames and passwords.

**Expected Output**: Error messages matching the expected format are displayed.

    // Test script for Validating the error message
    test('Validate Error Messages', async (t) => {
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
            await t.pressKey('f5');
            

        // Attempt 2: Invalid password
        await t
            .typeText(usernameInput, 'invalid_username')
            .typeText(passwordInput, 'Kedar@123')
            .click(loginButton)
            .expect(errorContainer.exists).ok()
            .expect(errorContainer.visible).ok()
            .expect(errorContainer.innerText)
            .contains('\nLogin Unsuccessful\n\nInvalid login credentials');
            await t.wait(3000);
    });

## Test Script 4: Redirect to Dashboard

**Purpose**: This script validates that a user is redirected to the dashboard screen upon successful login.

**Input**: Valid username and password.

**Expected Output**: The user is successfully logged in and redirected to the dashboard screen.

    // Test script for checking if the successfull login redirects us to dashboard

    test('Redirect to Dashboard', async (t) => {
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

## - Command used to run the program:
npx testcafe "chrome,edge" test.js

# 4) Test Environment

## Software Configuration

- **Operating System**: Windows 11
- **Web Browsers**: Chrome, Microsoft Edge
- **Node.js**: Node.js v18.17.1.
- **TestCafe**: TestCafe 3.3.0
- **Other Software**: VS Code
