class UtilityClass  {

    _builder = null;
    _id = null;

    constructor(builder){

        // Set Builder
        this._builder = builder;

        // Generate Incremental ID
        this._id = this._builder.count();
    }
}

class AvatarUtility extends UtilityClass {

    constructor(builder){

        // Call Parent
        super(builder);

        // Set Self
        const self = this;
    }

    avatar(email){

        // Set Self
        const self = this;

        // Create avatar
        var avatar = $(document.createElement('span'))
            .attr({
                'class': 'cursor-help align-middle',
            });

        // Set Label
        avatar.text(email);

        // Prepend Icon
        avatar.prepend($(document.createElement('img')).attr({
            'class': 'me-1 rounded-circle',
            'width': '48',
            'height': '48',
            'src': self._builder.Helper.gravatar(email),
        }));

        avatar.attr({
            'data-bs-toggle': 'tooltip',
            'data-bs-placement': 'top',
            'title': status.email,
            'data-bs-title': status.email,
        });

        // Enable Tooltip
        var tooltip = new bootstrap.Tooltip(avatar[0]);

        // Return avatar
        return avatar;
    }

    parse(string, locale = null){

        // Set Self
        const self = this;

        // Set Matches [[utility:type:level]]
        let matches = string.match(/\[\[(.*?)\]\]/g);

        // Check if Matches
        if(matches){

            // Loop through Matches
            for(const match of matches){

                // Set Key
                let key = match.replace('[[','').replace(']]','');
                let parts = key.split(':');
                let utility = parts[0];
                let email = parts[1];

                if(utility === 'avatar'){

                    // Get avatar
                    let avatar = self.avatar(email);

                    // Get html
                    let html = avatar[0].outerHTML;

                    // Replace Match
                    string = string.replace(match,html);
                }
            }
        }

        // Return
        return string;
    }
}

$(document).ready(function(){

    // Create Component
    Utility = new AvatarUtility(builder);

    // Get a Rating Badge (fr-ca)
    $(document.createElement('div'))
        .append(Utility.avatar('louis@laswitchtech.com'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('louis@laswitchtech.com'))
        .appendTo('#playground')

    // Parse a Badge
    $(document.createElement('div'))
        .append(Utility.parse('Parsing [[avatar:louis@laswitchtech.com]]'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('[[avatar:louis@laswitchtech.com]]'))
        .appendTo('#playground')
});
