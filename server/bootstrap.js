// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Bzrt Principles",
       items: ["Understand Workforce",
         "Digital Footprints",
         "Work Relationships",
         "Mission Alignment",
         "Empower Workforce",
       ]
      },
      {name: "Data Sources",
       items: ["Documents",
         "Spreadsheets",
         "Emails",
         "Chat",
         ]
      },
      {name: "Co-Workers",
       items: ["Ada Lovelace",
         "Grace Hopper",
         "Marie Curie",
         "Carl Friedrich Gauss",
         "Nikola Tesla",
         "Claude Shannon"
       ]
      }
    ];

    var timestamp = (new Date()).getTime();
    _.each(data, function(list) {
      var list_id = Lists.insert({name: list.name,
        incompleteCount: list.items.length});

      _.each(list.items, function(text) {
        Todos.insert({listId: list_id,
                      text: text,
                      createdAt: new Date(timestamp)});
        timestamp += 1; // ensure unique timestamp.
      });
    });
  }
});
