import {
	rephrase,
} from './analbumcover';


// Check wirds in dictionary
class Spelling {
	words: string[];
	constructor(word_list: string[]) {
		this.words = word_list
	}

	isCorrect(word: string): boolean {
		return this.words.includes(word);
	}
}

// Example dictionaries
// an album cover
const album_cover = new Spelling(['a', 'an', 'anal', 'album', 'bum', 'cove', 'cover', 'over'])

// poor attack you chump ire
const poor_attack = new Spelling(['poo', 'poor', 'or', 'rat', 'at', 'attack', 'tack', 'tacky', 
		'you', 'ouch', 'chum', 'chump',
		'hum', 'hump', 'umpire', 'ire'])

// Many Combinations Example
const alphabet = new Spelling([
	'a', 'ab', 'abc', 'abcd', 'abcde', 'abcdef',
	'b', 'bc', 'bcd', 'bcde', 'bcdef', 
	'c', 'cd', 'cde', 'cdef', 
	'd', 'de', 'def', 
	'e', 'ef', 
	'f'])



describe('rephrase', () => {
	// Special Cases
	it('special characters', function() {
		let result = rephrase('0123456789!@#$%^&*()_+-=\';:",.></?\\|`~"', album_cover, 1)
		expect(result).toBeNull();
	})

	it('silence', function() {
		let result = rephrase('', album_cover, 1)
		// expect(result).toMatch('')
		expect(result).toBeNull();
	})

	it('a', function() {
		let result = rephrase('a ', album_cover, 1)
		expect(result).toMatch('a');
	})

	it('A', function() {
		let result = rephrase('A', album_cover, 1)
		expect(result).toMatch('a');
	})

	it('trailing_space', function() {
		let result = rephrase('a ', album_cover, 1)
		expect(result).toMatch('a');
	})

	it('z', function() {
		let result = rephrase('z', album_cover, 1)
		expect(result).toMatch('z');
	})

	it('an', function() {
		let result = rephrase('an', album_cover, 1)
		expect(result).toMatch('an');
	})

	// One word input
	it('simple word', function() {
		let result = rephrase('album', album_cover, 1)
		expect(result).toMatch('album')
	})

	it('caps', function() {
		let result = rephrase('ALBUM', album_cover, 1)
		expect(result).toMatch('album')
	})

	it('negative_1', function() {
		let result = rephrase('album', album_cover, -1)
		expect(result).toMatch('album')
	})

	it('negative_10', function() {
		let result = rephrase('album', album_cover, -10)
		expect(result).toMatch('album')
	})

	it('too short', function() {
		let result = rephrase('album', album_cover, 6)
		expect(result).toBeNull();
	})

	// Video Example

	it('an album 1', function() {
		let result = rephrase('an album cover', album_cover, 1)
		expect(result).toMatch('anal bum cover');
	})

	it('an album 2', function() {
		let result = rephrase('an album cover', album_cover, 2)
		expect(result).toMatch('anal bum cover');
	})

	it('an album 3', function() {
		let result = rephrase('an album cover', album_cover, 3)
		expect(result).toMatch('anal bum cover');
	})

	it('an album 4', function() {
		let result = rephrase('an album cover', album_cover, 4)
		expect(result).toBeNull();
	})

	it('an album 5', function() {
		let result = rephrase('an album', album_cover, 5)
		expect(result).toBeNull();
	})

	//Github Example

	it('example', function() {
		let result = rephrase('Poor attack, you chump! Ire!', poor_attack, 1)
		expect(result).toMatch('poo rat tacky ouch umpire')
	})

	it('example', function() {
		let result = rephrase('Poor attack, you chump! Ire!', poor_attack, 2)
		expect(result).toMatch('poo rat tacky ouch umpire')
	})

	it('example', function() {
		let result = rephrase('Poor attack, you chump! Ire!', poor_attack, 3)
		expect(result).toMatch('poo rat tacky ouch umpire')
	})

	it('example', function() {
		let result = rephrase('Poor attack, you chump! Ire!', poor_attack, 4)
		expect(result).toBeNull()
	})

	it('example', function() {
		let result = rephrase('Poor attack, you chump! Ire!', poor_attack, 5)
		expect(result).toBeNull();
	})

	// Many Combinations Example
	it('alphabet 1', function(){ 
		let result = rephrase('a bc def', alphabet, 1)
		expect(result).toMatch('ab c d e f')
	})

	it('alphabet 2', function(){ 
		let result = rephrase('a bc def', alphabet, 2)
		expect(result).toMatch('ab cd ef')
	})

	it('alphabet 3', function(){ 
		let result = rephrase('a bc def ghij klmno', alphabet, 3)
		expect(result).toMatch('abc def')
	})

	it('alphabet 4', function(){ 
		let result = rephrase('a bc def', alphabet, 4)
		expect(result).toMatch('abcdef')
	})

})
