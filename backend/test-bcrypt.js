const bcrypt = require('bcryptjs');

async function testBcryptTiming() {
    const password = 'test123password';
    const rounds = [8, 9, 10, 11, 12];

    console.log('Testing bcrypt hashing times...\n');
    
    for (const round of rounds) {
        const start = Date.now();
        await bcrypt.hash(password, round);
        const end = Date.now();
        
        console.log(`Salt Rounds: ${round}`);
        console.log(`Time taken: ${end - start}ms\n`);
    }
}

testBcryptTiming();
