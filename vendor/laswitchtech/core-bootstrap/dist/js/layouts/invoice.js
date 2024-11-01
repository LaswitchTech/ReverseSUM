$(document).ready(function(){

    // Sample
    
    const sampleObject = new Invoice(
        "#example", //Selector or JQuery Object to appendTo
        {
            class: { //Classes to add to the invoice
                object: null, //Object Element
            },
            brand: "Lorem Inc.", //Brand Name
            logo: { //Logo
                path: "/img/logo.png", //Path to the logo
                size: "64px", //Size of the logo
            },
            from: { //From //Note that if not included, the from will not be displayed
                name: "Lorem Inc.", //Name
                address: "123 John Doe St.", //Address
                city: "Lorem City", //City
                country: "Lorem", //Country
                state: "Ipsum", //State
                zipcode: "12345", //Zipcode
                phone: "1234567890", //Phone
                email: "email@exemple.com", //Email
            },
            shipTo: { //Ship To //Note that if not included, the ship to will not be displayed
                name: "John Doe", //Name
                address: "123 John Doe St.", //Address
                city: "Ipsum City", //City
                country: "Ipsum", //Country
                state: "Lorem", //State
                zipcode: "12345", //Zipcode
                phone: "1234567890", //Phone
                email: "email@exemple.com", //Email
            },
            billTo: { //Bill To //Note that if not included, the ship to will not be displayed
                name: "John Doe", //Name
                address: "123 John Doe St.", //Address
                city: "Ipsum City", //City
                country: "Ipsum", //Country
                state: "Lorem", //State
                zipcode: "12345", //Zipcode
                phone: "1234567890", //Phone
                email: "email@exemple.com", //Email
            },
            number: "000123456", //Invoice Number
            date: "2014-02-10", //Invoice Date
            due: "2014-02-22", //Invoice Due Date
            info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", //Invoice Info
            methods: [ //Payment Methods // Currently available are visa, mastercard, paypal, americanExpress
                "visa",
                "mastercard",
                "paypal",
            ],
            references: [ //References Numbers to add to the invoice
                {label: "Order #", value: "123456"}, //Label and Value
                {label: "Account #", value: "123456"}, //Label and Value
            ],
            lines: [ // Invoice Lines can be added here
                {
                    class: { //Classes to add to the invoice lines
                        object: null, //Object Element
                    },
                    sku: "123456", //SKU
                    name: "Call of Duty", //Name
                    description: "El snort testosterone trophy driving gloves handsome", //Description
                    serial: "455-981-221", //Serial
                    qty: 1, //Quantity
                    price: 64.50, //Price
                    subtotal: 64.50, //Subtotal
                },
            ],
            columns: [ //Columns to add to the invoice lines // Currently available are sku, name, description, serial, qty, price, subtotal
                "sku",
                "name",
                "description",
                "qty",
                "price",
                "subtotal",
            ],
            defaults: { //Default Values for the invoice lines
                class: { //Classes to add to the invoice lines
                    object: null, //Object Element
                },
                sku: null, //SKU
                name: null, //Name
                description: null, //Description
                serial: null, //Serial
                qty: null, //Quantity
                price: null, //Price
            },
            shipping: 25, //Shipping Cost
            rates:{ //Tax Rates
                tax1: 9.97, //Tax 1
                tax2: 5, //Tax 2
            },
        },
        function(element,invoice){ //Callback
            invoice.add( //Add a line to the invoice //Note: This function can be called multiple times to add multiple items. It can also called outside of the callback function.
                {
                    class: { //Classes to add to the invoice lines
                        object: null, //Object Element
                    },
                    sku: "123456", //SKU
                    name: "Call of Duty", //Name
                    description: "El snort testosterone trophy driving gloves handsome", //Description
                    serial: "455-981-221", //Serial
                    qty: 1, //Quantity
                    price: 64.50, //Price
                },
                function(line,invoice){}, //Callback},
            );
        }, 
    );

    // Code

    let scriptCode = '';
    scriptCode += 'const sampleObject = new Invoice(' + "\n";
    scriptCode += '    "#example", //Selector or JQuery Object to appendTo' + "\n";
    scriptCode += '    {' + "\n";
    scriptCode += '        class: { //Classes to add to the invoice' + "\n";
    scriptCode += '            object: null, //Object Element' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '        brand: "Lorem Inc.", //Brand Name' + "\n";
    scriptCode += '        logo: { //Logo' + "\n";
    scriptCode += '            path: "/img/logo.png", //Path to the logo' + "\n";
    scriptCode += '            size: "64px", //Size of the logo' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '        from: { //From //Note that if not included, the from will not be displayed' + "\n";
    scriptCode += '            name: "Lorem Inc.", //Name' + "\n";
    scriptCode += '            address: "123 John Doe St.", //Address' + "\n";
    scriptCode += '            city: "Lorem City", //City' + "\n";
    scriptCode += '            country: "Lorem", //Country' + "\n";
    scriptCode += '            state: "Ipsum", //State' + "\n";
    scriptCode += '            zipcode: "12345", //Zipcode' + "\n";
    scriptCode += '            phone: "1234567890", //Phone' + "\n";
    scriptCode += '            email: "email@exemple.com", //Email' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '        shipTo: { //Ship To //Note that if not included, the ship to will not be displayed' + "\n";
    scriptCode += '            name: "John Doe", //Name' + "\n";
    scriptCode += '            address: "123 John Doe St.", //Address' + "\n";
    scriptCode += '            city: "Ipsum City", //City' + "\n";
    scriptCode += '            country: "Ipsum", //Country' + "\n";
    scriptCode += '            state: "Lorem", //State' + "\n";
    scriptCode += '            zipcode: "12345", //Zipcode' + "\n";
    scriptCode += '            phone: "1234567890", //Phone' + "\n";
    scriptCode += '            email: "email@exemple.com", //Email' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '        billTo: { //Bill To //Note that if not included, the ship to will not be displayed' + "\n";
    scriptCode += '            name: "John Doe", //Name' + "\n";
    scriptCode += '            address: "123 John Doe St.", //Address' + "\n";
    scriptCode += '            city: "Ipsum City", //City' + "\n";
    scriptCode += '            country: "Ipsum", //Country' + "\n";
    scriptCode += '            state: "Lorem", //State' + "\n";
    scriptCode += '            zipcode: "12345", //Zipcode' + "\n";
    scriptCode += '            phone: "1234567890", //Phone' + "\n";
    scriptCode += '            email: "email@exemple.com", //Email' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '        number: "000123456", //Invoice Number' + "\n";
    scriptCode += '        date: "2014-02-10", //Invoice Date' + "\n";
    scriptCode += '        due: "2014-02-22", //Invoice Due Date' + "\n";
    scriptCode += '        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", //Invoice Info' + "\n";
    scriptCode += '        methods: [ //Payment Methods // Currently available are visa, mastercard, paypal, americanExpress' + "\n";
    scriptCode += '            "visa",' + "\n";
    scriptCode += '            "mastercard",' + "\n";
    scriptCode += '            "paypal",' + "\n";
    scriptCode += '        ],' + "\n";
    scriptCode += '        references: [ //References Numbers to add to the invoice' + "\n";
    scriptCode += '            {label: "Order #", value: "123456"}, //Label and Value' + "\n";
    scriptCode += '            {label: "Account #", value: "123456"}, //Label and Value' + "\n";
    scriptCode += '        ],' + "\n";
    scriptCode += '        lines: [ // Invoice Lines can be added here' + "\n";
    scriptCode += '            {' + "\n";
    scriptCode += '                class: { //Classes to add to the invoice lines' + "\n";
    scriptCode += '                    object: null, //Object Element' + "\n";
    scriptCode += '                },' + "\n";
    scriptCode += '                sku: "123456", //SKU' + "\n";
    scriptCode += '                name: "Call of Duty", //Name' + "\n";
    scriptCode += '                description: "El snort testosterone trophy driving gloves handsome", //Description' + "\n";
    scriptCode += '                serial: "455-981-221", //Serial' + "\n";
    scriptCode += '                qty: 1, //Quantity' + "\n";
    scriptCode += '                price: 64.50, //Price' + "\n";
    scriptCode += '                subtotal: 64.50, //Subtotal' + "\n";
    scriptCode += '            },' + "\n";
    scriptCode += '        ],' + "\n";
    scriptCode += '        columns: [ //Columns to add to the invoice lines // Currently available are sku, name, description, serial, qty, price, subtotal' + "\n";
    scriptCode += '            "sku",' + "\n";
    scriptCode += '            "name",' + "\n";
    scriptCode += '            "description",' + "\n";
    scriptCode += '            "qty",' + "\n";
    scriptCode += '            "price",' + "\n";
    scriptCode += '            "subtotal",' + "\n";
    scriptCode += '        ],' + "\n";
    scriptCode += '        defaults: { //Default Values for the invoice lines' + "\n";
    scriptCode += '            class: { //Classes to add to the invoice lines' + "\n";
    scriptCode += '                object: null, //Object Element' + "\n";
    scriptCode += '            },' + "\n";
    scriptCode += '            sku: null, //SKU' + "\n";
    scriptCode += '            name: null, //Name' + "\n";
    scriptCode += '            description: null, //Description' + "\n";
    scriptCode += '            serial: null, //Serial' + "\n";
    scriptCode += '            qty: null, //Quantity' + "\n";
    scriptCode += '            price: null, //Price' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '        shipping: 25, //Shipping Cost' + "\n";
    scriptCode += '        rates:{ //Tax Rates' + "\n";
    scriptCode += '            tax1: 9.97, //Tax 1' + "\n";
    scriptCode += '            tax2: 5, //Tax 2' + "\n";
    scriptCode += '        },' + "\n";
    scriptCode += '    },' + "\n";
    scriptCode += '    function(element,invoice){ //Callback' + "\n";
    scriptCode += '        invoice.add( //Add a line to the invoice //Note: This function can be called multiple times to add multiple items. It can also called outside of the callback function.' + "\n";
    scriptCode += '            {' + "\n";
    scriptCode += '                class: { //Classes to add to the invoice lines' + "\n";
    scriptCode += '                    object: null, //Object Element' + "\n";
    scriptCode += '                },' + "\n";
    scriptCode += '                sku: "123456", //SKU' + "\n";
    scriptCode += '                name: "Call of Duty", //Name' + "\n";
    scriptCode += '                description: "El snort testosterone trophy driving gloves handsome", //Description' + "\n";
    scriptCode += '                serial: "455-981-221", //Serial' + "\n";
    scriptCode += '                qty: 1, //Quantity' + "\n";
    scriptCode += '                price: 64.50, //Price' + "\n";
    scriptCode += '            },' + "\n";
    scriptCode += '            function(line,invoice){}, //Callback},' + "\n";
    scriptCode += '        );' + "\n";
    scriptCode += '    }, ' + "\n";
    scriptCode += ');';
    
    const code = new Code(
        '#code',
        {
            language: 'javascript',
            title: 'Code',
            clipboard:true,
            fullscreen:true,
            collapsed:true,
            code:scriptCode,
        },
        function(element,code){}
    );

    let pretty = prettier.format($('#example').html(), { parser: "html", tabWidth: 4, useTabs: true, plugins: prettierPlugins });
    
    const html = new Code(
        '#htmlcode',
        {
            language: 'markup',
            title: 'Code',
            clipboard:true,
            fullscreen:true,
            collapsed:true,
            code:pretty,
        },
        function(element,code){}
    );
});