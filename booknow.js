document.addEventListener('alpine:init', () => {
    Alpine.data('ticket', () => ({
        name : '',	
        email : '',
        p_num : '',
        check_in : '',
        check_out : '',
        wifi  : false,
        pool : false,
        garden : false,
        extra_bed : false,
        instructor : false,
        promo : '',
        apply : false,
        loyal : false,
        orooms : localStorage.getItem('rooms'),
        oguests : localStorage.getItem('guests'),
        ototal : localStorage.getItem('total'),
        
        RoomTypes : [
            {
                name : 'Single',
                count : 0,
                cost : 25000
            
            }
            ,
            {
                name : 'Double',
                count : 0,
                cost : 35000
            
            },
            {
                name : 'Triple',
                count : 0,
                cost : 40000
            
            }
        ],
        GuestTypes : [
            {
                name : 'Adult',
                count : 0,
                
            },
            {
                name : 'Child',
                count : 0,
            }
        ],
        Adventure : [
            {
                name : 'Local Adult',
                count : 0,
                cost : 5000
            },
            {
                name : 'Local Child',
                count : 0,
                cost : 2000
            },
            {
                name : 'Foreign Adult',
                count : 0,
                cost : 10000
            },
            {
                name : 'Foreign Child',
                count : 0,
                cost : 5000
            }
        ],

        StayDuration() {
            const checkInDate = new Date(this.check_in);
            const checkOutDate = new Date(this.check_out);
        
            
            if (isNaN(checkInDate) || isNaN(checkOutDate)) {
                return 0; 
            }
        
            const duration = checkOutDate.getTime() - checkInDate.getTime();
            return duration / (1000 * 3600 * 24);
        }
        ,
        NumberRooms(){
            totalRooms = 0;
            this.RoomTypes[0].count = parseInt(this.RoomTypes[0].count);
            this.RoomTypes[1].count = parseInt(this.RoomTypes[1].count);
            this.RoomTypes[2].count = parseInt(this.RoomTypes[2].count);
            totalRooms = this.RoomTypes[0].count + this.RoomTypes[1].count + this.RoomTypes[2].count;
            return totalRooms;

            
        },
        NumberGuests(){
            totalGuests = 0;
            this.GuestTypes[0].count = parseInt(this.GuestTypes[0].count);
            this.GuestTypes[1].count = parseInt(this.GuestTypes[1].count);
            totalGuests = this.GuestTypes[0].count + this.GuestTypes[1].count;
            return totalGuests;
        },
        loyalty(){
            if(this.loyal == true){
                if(this.NumberRooms() >= 3){
                   points =this.NumberRooms()*20
                    return points;
                }
                else{
                    return 0;
                }
            }
            else{
                return 0;
            }
        },
        AdeventureCount(){
            totalAdventure = 0;
            this.Adventure[0].count = parseInt(this.Adventure[0].count);
            this.Adventure[1].count = parseInt(this.Adventure[1].count);
            this.Adventure[2].count = parseInt(this.Adventure[2].count);
            this.Adventure[3].count = parseInt(this.Adventure[3].count);
            totalAdventure = this.Adventure[0].count + this.Adventure[1].count + this.Adventure[2].count + this.Adventure[3].count;
            return totalAdventure;
        },
        TotalCost(){
            s_room = parseInt(this.RoomTypes[0].count) * parseInt(this.RoomTypes[0].cost);
            d_room = parseInt(this.RoomTypes[1].count) * parseInt(this.RoomTypes[1].cost);
            t_room = parseInt(this.RoomTypes[2].count) * parseInt(this.RoomTypes[2].cost);
            total_rooms = s_room + d_room + t_room;

            this.GuestTypes[1].count = parseInt(this.GuestTypes[1].count);
            total_children = parseInt(this.GuestTypes[1].count) * 5000;

            sa_ad = parseInt(this.Adventure[0].count) * parseInt(this.Adventure[0].cost);
            sc_ad = parseInt(this.Adventure[1].count) * parseInt(this.Adventure[1].cost);
            fa_ad = parseInt(this.Adventure[2].count) * parseInt(this.Adventure[2].cost);
            fc_ad = parseInt(this.Adventure[3].count) * parseInt(this.Adventure[3].cost);
            total_adventure = sa_ad + sc_ad + fa_ad + fc_ad;

            total_beds = 0;
            if(this.extra_bed == true){
                total_beds = this.NumberRooms() * 8000;
            }
            else{
                total_beds = 0;
            }
            toal_istructor = 0;
            if(this.instructor == true){
                total_adults = parseInt(this.Adventure[0].count) + parseInt(this.Adventure[2].count);
                total_child = parseInt(this.Adventure[1].count) + parseInt(this.Adventure[3].count);
                total_istructor = (total_adults * 1000)+(total_child * 500);
            }else{
                total_istructor = 0;
            }
            days  = this.StayDuration();
            Full_Total = total_rooms + total_adventure + total_beds + total_istructor;
            Full_Total = Full_Total * days;
           return Full_Total;

            
            
        },
        Discount(){
            if(this.apply == true){
                if(this.promo == 'Promo123'){
                    total = parseInt(this.TotalCost());
                    discount = total * (5/100);
                    return discount;
                }
                else{
                    return 'No Discount';
                }
            }
            else {
                return 'No Discount';
            }
            
        },
        Total(){
            if(this.Discount() == 'No Discount'){
                return this.TotalCost();
            }
            else{
                total = parseInt(this.TotalCost());
                discount = parseInt(this.Discount());
                total = total - discount;
                return total;
            }
        },
        localloyalty(){
            getloyal = localStorage.getItem('loyalty');
            if(getloyal === null){
                loyaltypoints = this.loyalty();
                return localStorage.setItem('loyalty',loyaltypoints);
            }else{
                loyaltypoints = parseInt(getloyal) + parseInt(this.loyalty());
                return localStorage.setItem('loyalty',loyaltypoints);
            }
        },
        localRoom(){
            getRooms = localStorage.getItem('rooms');
            if(getRooms === null){
                rooms = this.NumberRooms();
                return localStorage.setItem('rooms',rooms);
            }else{
                rooms = parseInt(getRooms) + parseInt(this.NumberRooms());
                return localStorage.setItem('rooms',rooms);
            }
        },
        localguests(){
            getGuests = localStorage.getItem('guests');
            if(getGuests === null){
                guests = this.NumberGuests();
                return localStorage.setItem('guests',guests);
            }else{
                guests = parseInt(getGuests) + parseInt(this.NumberGuests());
                return localStorage.setItem('guests',guests);
            }
        },     
        localtotal(){
            gettotal = localStorage.getItem('total');
            if(gettotal === null){
                total = this.Total();
                return localStorage.setItem('total',total);
            }else{
                total = parseInt(gettotal) + parseInt(this.Total());
                return localStorage.setItem('total',total);
            }
        }, 

        BookNow(){
            
                this.localloyalty();
                this.localRoom();
                this.localguests();
                this.localtotal();
                
                window.location.reload();
                
            },
        favorite(){
            rts = this.RoomTypes[0].count;
            rtd = this.RoomTypes[1].count;
            rtt = this.RoomTypes[2].count;
            gta = this.GuestTypes[0].count;
            gtc = this.GuestTypes[1].count;
            ala = this.Adventure[0].count;
            alc = this.Adventure[1].count;
            afa = this.Adventure[2].count;
            afc = this.Adventure[3].count;

            localStorage.setItem('Frooms',rts);
            localStorage.setItem('Froomd',rtd);
            localStorage.setItem('Froomt',rtt);
            localStorage.setItem('Fguesta',gta);
            localStorage.setItem('Fguestc',gtc);
            localStorage.setItem('Fadulta',ala);
            localStorage.setItem('Fadultc',alc);
            localStorage.setItem('Fforeigna',afa);
            localStorage.setItem('Fforeignc',afc);
        },
        getfavorite(){
            rts = localStorage.getItem('Frooms');
            rtd = localStorage.getItem('Froomd');
            rtt = localStorage.getItem('Froomt');
            gta = localStorage.getItem('Fguesta');
            gtc = localStorage.getItem('Fguestc');
            ala = localStorage.getItem('Fadulta');
            alc = localStorage.getItem('Fadultc');
            afa = localStorage.getItem('Fforeigna');
            afc = localStorage.getItem('Fforeignc');

            this.RoomTypes[0].count = rts;
            this.RoomTypes[1].count = rtd;
            this.RoomTypes[2].count = rtt;
            this.GuestTypes[0].count = gta;
            this.GuestTypes[1].count = gtc;
            this.Adventure[0].count = ala;
            this.Adventure[1].count = alc;
            this.Adventure[2].count = afa;
            this.Adventure[3].count = afc;
        }
            


                
        }))

          
    })

