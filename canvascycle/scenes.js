var scenes = [
	/* {
		name: 'TESTRAMP',
		title: 'Test Image'
	}, */
	{
		name: 'CORAL',
		title: 'Aquarius - Day',
		sound: 'CORAL',
		maxVolume: 0.25
	},
	{
		name: 'V01',
		title: 'Island Fires - Dusk',
		sound: 'V29',
		maxVolumd: 0.25
	},
	{
		name: 'V02',
		title: 'Mountain Fortress - Dusk',
		sound: 'V02',
		maxVolume: 1.0
	},
	{
		name: 'V03',
		title: 'Swamp Cathedral - Day',
		sound: 'V03'
	},
	{
		name: 'V04',
		title: 'Highland Ruins - Rain',
		sound: 'V04'
	},
	{
		name: 'V05AM',
		title: 'Haunted Castle Ruins - Day',
		sound: 'V05HAUNT'
	},
	{
		name: 'V05RAIN',
		title: 'Haunted Castle Ruins - Rain',
		sound: 'V05RAIN'
	},
	{
		name: 'V05PM',
		title: 'Haunted Castle Ruins - Afternoon',
		sound: 'V05HAUNT'
	},
	{
		name: 'V05HAUNT',
		title: 'Haunted Castle Ruins - Night',
		sound: 'V05HAUNT'
	},
	{
		name: 'V07',
		title: 'Rough Seas - Day',
		sound: 'V07'
	},
	{
		name: 'V08AM',
		title: 'Jungle Waterfall - Morning',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		name: 'V08',
		title: 'Jungle Waterfall - Afternoon',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		name: 'V08RAIN',
		title: 'Jungle Waterfall - Rain',
		sound: 'V08RAIN'
	},
	{
		name: 'V08PM',
		title: 'Jungle Waterfall - Night',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		name: 'V09',
		title: 'Forest Edge - Day',
		sound: 'V09',
		maxVolume: 1.0
	},
	{
		name: 'V10',
		title: 'Deep Swamp - Day',
		sound: 'V10'
	},
	{
		name: 'V11AM',
		title: 'Approaching Storm - Day',
		sound: 'V02',
		maxVolume: 1.0
	},
	{
		name: 'V12',
		title: 'Stone Circle - Day',
		sound: 'V03'
	},
	{
		name: 'V13',
		title: 'Pond Ripples - Dawn',
		sound: 'V13'
	},
	{
		name: 'V14',
		title: 'Mountain Storm - Day',
		sound: 'V14',
		maxVolume: 1.0
	},
	{
		name: 'V15',
		title: 'Harbor Town - Night',
		sound: 'V15'
	},
	{
		name: 'V16',
		title: 'Mirror Pond - Morning',
		sound: 'V16'
	},
	{
		name: 'V16RAIN',
		title: 'Mirror Pond - Rain',
		sound: 'V16RAIN'
	},
	{
		name: 'V16PM',
		title: 'Mirror Pond - Afternoon',
		sound: 'V16'
	},
	{
		name: 'V17',
		title: 'Ice Wind - Day',
		sound: 'V17',
		maxVolume: 0.25
	},
	{
		name: 'V18',
		title: 'Mountain Ruins - Morning',
		sound: 'V13'
	},
	{
		name: 'V19',
		title: 'Mountain Stream - Morning',
		sound: 'V19'
	},
	{
		name: 'V19PM',
		title: 'Mountain Stream - Afternoon',
		sound: 'V19'
	},
	{
		name: 'V19AURA',
		title: 'Mountain Stream - Night',
		sound: 'V19'
	},
	{
		name: 'V20',
		title: 'Crystal Caves - Day',
		sound: 'V20'
	},
	{
		name: 'V21',
		title: 'Jungle City - Day',
		sound: 'V10'
	},
	{
		name: 'V22',
		title: 'Palace - Night',
		sound: 'V15'
	},
	{
		name: 'V23',
		title: 'Mountain - Afternoon',
		sound: 'V25HEAT'
	},
	{
		name: 'V24',
		title: 'Stone Valley - Day',
		sound: 'V25HEAT'
	},
	{
		name: 'V25',
		title: 'Desert - Day',
		sound: 'V25HEAT'
	},
	{
		name: 'V25PM',
		title: 'Desert - Afternoon',
		sound: 'V25HEAT'
	},
	{
		name: 'V25HEAT',
		title: 'Desert Heat Wave - Day',
		sound: 'V25HEAT'
	},
	{
		name: 'V26',
		title: 'Winter Forest - Day',
		sound: 'V13',
		maxVolume: 0.25
	},
	{
		name: 'V26SNOW',
		title: 'Winter Forest - Snow',
		sound: 'V05RAIN',
		maxVolume: 0.25
	},
	{
		name: 'V26PM',
		title: 'Winter Forest - Afternoon',
		sound: 'V13',
		maxVolume: 0.25
	},
	{
		name: 'V26NIGHT',
		title: 'Winter Forest - Night',
		sound: 'V05HAUNT',
		maxVolume: 0.25
	},
	{
		name: 'V27',
		title: 'Magic Marsh Cave - Night',
		sound: 'V25HEAT'
	},
	{
		name: 'V28',
		title: 'Water City Gates - Fog',
		sound: 'V28'
	},
	{
		name: 'V29',
		title: 'Seascape - Day',
		sound: 'V29'
	},
	{
		name: 'V29FOG',
		title: 'Seascape - Fog',
		sound: 'V29'
	},
	{
		name: 'V29PM',
		title: 'Seascape - Sunset',
		sound: 'V29'
	},
	{
		name: 'V30',
		title: 'Deep Forest - Day',
		sound: 'V30',
		maxVolume: 0.25
	},
	{
		name: 'V30RAIN',
		title: 'Deep Forest - Rain',
		sound: 'V30RAIN'
	},
	{
		name: 'ST_PLAIN2',
		title: 'River Village - Day',
		sound: 'V03'
	},
	{
		name: 'TESTRAMP',
		title: 'Testramp',
		sound: ''
	}
];
