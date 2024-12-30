const bcrypt = require('bcryptjs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function compareHash() {
    readline.question('Enter the bcrypt hash: ', async (hash) => {
        readline.question('Enter the password to check: ', async (password) => {
            try {
                const isMatch = await bcrypt.compare(password, hash);
                if (isMatch) {
                    console.log('Password matches the hash.');
                } else {
                    console.log('Password does not match the hash.');
                }
            } catch (error) {
                console.error('Error comparing hash:', error);
            } finally {
                readline.close();
            }
        });
    });
}

compareHash();
