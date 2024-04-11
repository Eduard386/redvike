# Project Title

Test task from AQA Eduard Stepanyshchenko for Redvike

## Getting Started

1. Install Nodejs
2. Install npm
3. Create project folder on your machine
4. Init git there
5. Clone the repo
6. Install dependencies
7. Run "npx playwright test" to run tests

P.S.
It is expected that some of tests will fail. 
- After successful login, we do not display .gif image on https://qa-task.redvike.rocks/success page;
- After successful login, we do not display image with size of more than 2mb on https://qa-task.redvike.rocks/success page
- Also, we need to add more validations for passwords, currently they can be very simple;
- Also, we need to add more validations for emails, currently email like 'john.doe.@example.com', 'john..doe@example.com', 'john..doe@example.com', '.john.doe@example.com' are valid;
- We can run all tests in different browsers and devices, I did not implement that, but it is possible;
- We can do a lot of useful and interesting stuff to make tests better, but not in a scope of test task;
- I spent about 3 hours for this task, this is the very basic implementation.
- By the way, it is strange that we have different types of validation for name fields and for passwords.
- Multiple negative tests could be added, like uploading different types of data instead of images.