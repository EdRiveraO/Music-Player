class Drop {
    constructor() {
    
    }

    drop(ev) {
        ev.preventDefault(); // Necessary. Allows us to drop.
        let file = ev.dataTransfer.files;
            var reader = new FileReader();

            reader.onload = function (ev) {
              //var dv = new jDataView( ev.target.result);
               var dv = ev.target.result;
               if (readString(3, dv.byteLength - 128) == 'TAG') {
                var title = dv.readString(30, dv.tell());
               var artist = dv.readString(30, dv.tell());
              var album = dv.readString(30, dv.tell());
             var year = dv.readString(4, dv.tell());
             console.log(title);
              } else {
                // no ID3v1 data found.
              }
                
            }
            reader.readAsArrayBuffer(file[0]);
           // reader.readAsDataURL(file[0]);
    }
    readString(dataView,offset, length){
      var o = '';
      for (var i = offset; i < offset + length; i++) {
        // keep only printable characters
        if (i >= 32) o += String.fromCharCode(dataView.getUint8(i));
      }
      return o;
    }
    allowDrop(ev) {
        console.log("Arrastra2");
        ev.preventDefault();
    }
  
}  