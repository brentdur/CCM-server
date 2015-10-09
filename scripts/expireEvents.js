conn = new Mongo();
// db = conn.getDB('ccm-development');
db = conn.getDB('ccm');
var cursor = db.events.find({$or:[{expired:false}, {expired: {$exists:false}}]});

var bulk = db.events.initializeUnorderedBulkOp();


while(cursor.hasNext()){
	var item = cursor.next();
	var date = Date.parse(item.date);
	if (date - Date.now() < 0){
		bulk.find({_id:item._id}).updateOne({$set:{expired:true}});
		printjson(item);
	}
}

bulk.execute();
