conn = new Mongo();
db = conn.getDB("testNewDB");

db.clients.find().forEach(function (client) {
    var name = client.name.toLowerCase();
    name = name.replace(/\s+/g, '');
    name = name.replace(/['&]/g,'');
    print('----- ' + name + ' -----');
    var toRun = function () {
        db["NAMEGOESHERE"].find().sort({date:1}).forEach(function(day) {
            if (typeof(day.date) === "object") {
                var d = day.date;
                var p = (d.getMonth()+1) + "/";
                p += d.getUTCDate() + "/";
                p += d.getFullYear();
                print(day.date + ' ---> ' + p);
                db["NAMEGOESHERE"].update({"_id": day._id},{$set: {stringDate: p}});
            }
        })
    }
    var lol = toRun.toString();
    lol = lol.replace(/\s+/g,'');
    lol = lol.replace(/NAMEGOESHERE/g, name);
    lol = lol.replace('function(){', '');
    lol = lol.replace('vard', 'var d');
    lol = lol.replace('varp', 'var p');
    lol = lol.slice(0, lol.length-1);
    //print(lol);
    eval(lol);
})