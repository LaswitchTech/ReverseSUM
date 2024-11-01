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

class ParserUtility extends UtilityClass {

    constructor(builder){

        // Call Parent
        super(builder);

        // Set Self
        const self = this;
    }

    parse(string, locale = null){

        // Set Self
        const self = this;

        // Parse through locale
        if(typeof string === 'string'){
            string = self._builder.Locale.parse(string,locale);
        }

        // Parse through status
        if(typeof string === 'string'){
            string = self._builder.Status.parse(string,locale);
        }

        // Parse through rating
        if(typeof string === 'string'){
            string = self._builder.Rating.parse(string,locale);
        }

        // Return
        return string;
    }
}

$(document).ready(function(){

    // Create Component
    Utility = new ParserUtility(builder);

    // Loop through each status
    for(const [key, record] of Object.entries([
        {type: 'leads',locale: 'en-ca',label: 'New',description: "The lead has been created but no action has been taken yet. It is in the initial stage and is yet to be worked on.",icon: 'stars',color: 'success',level: 1},
        {type: 'leads',locale: 'en-ca',label: 'Open',description: "The lead has been opened but no action has been taken yet. It is in the initial stage and is yet to be worked on.",icon: 'folder',color: 'primary',level: 2},
        {type: 'leads',locale: 'en-ca',label: 'Assign',description: "The lead is ready to be assigned to a specific team member or representative who will be responsible for following up and managing the lead.",icon: 'person-check',color: 'primary',level: 3},
        {type: 'leads',locale: 'en-ca',label: 'Analysis',description: "The lead needs to be analyzed by the assigned team member or representative. The analysis is so that the team member or representative can learn about the prospect.",icon: 'eyeglasses',color: 'purple',level: 4},
        {type: 'leads',locale: 'en-ca',label: 'Contact',description: "The lead is ready to be contacted by the assigned team member or representative. This contact is meant to make the initial presentation of the services.",icon: 'easel2',color: 'blue',level: 5},
        {type: 'leads',locale: 'en-ca',label: 'Firm Report',description: "The lead showed interest in the services. We now need to setup an Authorization Letter to request the prospect's history of customs entries.", icon: 'file-earmark-spreadsheet',color: 'pink',level: 6},
        {type: 'leads',locale: 'en-ca',label: 'Agreement',description: "A firm report has been obtained and analyzed by a consultant. We are ready to prepare an offer and sign an agreement.",icon: 'vextor-pen',color: 'info',level: 7},
        {type: 'leads',locale: 'en-ca',label: 'Allocate',description: "The agreement has been signed by the prospect. We are now ready to start the process of customs claims.",icon: 'person-check-fill',color: 'warning',level: 8},
        {type: 'leads',locale: 'en-ca',label: 'in Progress',description: "The lead is in the process of customs claims. The process is being handled by the assigned team member or representative.",icon: 'arrow-repeat',color: 'orange',level: 9},
        {type: 'leads',locale: 'en-ca',label: 'Completed',description: "The customs claims process has been completed. The lead is now closed and the process is finished.",icon: 'check-circle',color: 'success',level: 10},
        {type: 'leads',locale: 'en-ca',label: 'Archived',description: "The lead has been archived. It is no longer active and has been moved to the archive folder.",icon: 'archive',color: 'dark',level: 11},
    ])){

        // Save Status
        builder.Status.save(record);

        // Save Rating
        builder.Rating.save(record);
    }

    // Get Locale String (unknown all)
    $(document.createElement('div'))
        .html(Utility.parse('{{This is an example of a string that needs to be parsed.}} Along with a status [[status:leads:1]] and a rating [[rating:leads:2]]'))
        .prepend($(document.createElement('strong')).addClass('mx-1').text('Example'))
        .appendTo('#playground')
});
