const test_data = {
    'valid': {
        'first_name': 'Test first name',
        'last_name': 'Test last name',
        'email': 'buffout386@gmail.com',
        'password': '123123123'
    },
    'avatars': ['avatar.jpg', 'avatar.jpeg', 'avatar.gif', 'avatar.bmp', 'avatar.png', 'avatar_3mb.jpeg'],
    'invalid_emails': ['Abc.example.com', 'A@b@c@example.com', 'a"b(c)d,e:f;g<h>i[j\k]l@example.com',
                        'just"not"right@example.com', 'jthis is"not\allowed@example.com', 
                        'this\ still\"not\\allowed@example.com', 'john.doe@example..com'],
                        // 'john.doe.@example.com', 'john..doe@example.com', 'john..doe@example.com', '.john.doe@example.com', ],]
}

module.exports = test_data;
