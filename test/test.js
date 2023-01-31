require('chai').should()
var emoji = require('../')

describe('react-easy-emoji', () => {
	it ('should work', () => {
		var elements = emoji('This is really 😄')

		elements.should.have.lengthOf(2)
		elements[0].should.equal('This is really ')

		var element = elements[1]

		element.type.should.equal('img')
		element.props.alt.should.equal('😄')
		element.key.should.equal('15')
		element.props.src.should.equal('//twemoji.maxcdn.com/2/72x72/1f604.png')
	})
	it ('should ignore the protocol option if one is provided in the baseUrl', () => {
		var element = emoji('😄', { baseUrl: 'https://someurl.com/'})[0]
		element.props.src.should.equal('https://someurl.com/72x72/1f604.png')
	})
	// Source: https://github.com/appfigures/react-easy-emoji/issues/18
	it ('should provide a unique key when using an array with multiple strings', () => {
		var element = emoji(['😄', '😄'])
		element[0].key.should.not.equal(element[1].key)
	})

	it ('should support emoji 14', () => {
		var element = emoji('🫠')
		element.should.have.lengthOf(1)
		element[0].type.should.equal('img')
		element[0].props.alt.should.equal('🫠')
		element[0].props.src.should.equal('//twemoji.maxcdn.com/2/72x72/1fae0.png')
	})

	it ('handles empty size params to produce svgs', () => {
		var element = emoji('😄', { size: '' })[0]
		element.props.src.should.equal('//twemoji.maxcdn.com/2/svg/1f604.svg')
	})
})