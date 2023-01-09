# Dropbox API Spec - Volodymyr Karan KI-01

Test scenario:

1. Check if file uploads successfully.
2. Check if api can get a file metadata.
3. Delete the file.

## Available Scripts

In the project directory, you can run:

### `npm install`

Downloads all necessary npm modules and packages.

### `npm test`

Launches the jasmine spec runner.

## ACCESS_TOKEN

1. Go to https://www.dropbox.com/developers/. Sign in for an account.
2. Create new app.
3. Go to permissions and allow files.metadata.write,files.content.write and files.content.read.
4. Go to your app settings and generate token.
5. Paste it into ACCESS_TOKEN.

Now you can run test!
