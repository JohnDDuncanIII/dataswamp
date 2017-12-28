var scenes = [
	{
		month: '01January',
		scpt: 'janclrscpt',
		name: 'V26',
		title: 'January - Winter Forest - Clear',
		sound: 'V13'
	},
	{
		monthIdx: 0,
		month: '01January',
		scpt: 'jansnowscpt',
		name: 'V26SNOW',
		title: 'January - Winter Forest - Snow',
		sound: 'V05RAIN',
		maxVolume: 0.25
	},
	{
		monthIdx: 1,
		month: '02February',
		scpt: 'febclrscpt',
		name: 'V19',
		title: 'February - Mountain Stream - Clear',
		sound: 'V19'
	},
	{
		month: '02February',
		scpt: 'febcldyscpt',
		name: 'V19CLOUD',
		title: 'February - Mountain Stream - Cloudy',
		sound: 'V19'
	},
	{
		monthIdx: 2,
		month: '03March',
		scpt: 'MARCLRSCPT',
		name: 'VW3BASIC',
		title: 'March - Monolith Plains - Clear',
		sound: 'V02'
	},
	{
		monthIdx: 3,
		month: '04April',
		scpt: 'aprclrscpt',
		name: 'V30',
		title: 'April - Deep Forest - Clear',
		sound: 'V30',
		maxVolume: 0.25
	},
	{
		month: '04April',
		scpt: 'aprrainscpt',
		name: 'V30RAIN',
		title: 'April - Deep Forest - Rain',
		sound: 'V30RAIN'
	},
	{
		monthIdx: 4,
		month: '05May',
		scpt: 'MAYCLRSCPT',
		name: 'V08',
		title: 'May - Jungle Waterfall - Clear',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		month: '05May',
		scpt: 'MAYCLDYSCPT',
		name: 'V08CLOUD',
		title: 'May - Jungle Waterfall - Cloudy',
		sound: 'V08',
		maxVolume: 0.25
	},
	{
		month: '05May',
		scpt: 'MAYRAINSCPT',
		name: 'V08RAIN',
		title: 'May - Jungle Waterfall - Rain',
		sound: 'V08RAIN'
	},
	{
		monthIdx: 5,
		month: '06June',
		scpt: 'jundayscpt',
		name: 'V20JOE',
		title: 'June - Crystal Caves - Clear',
		sound: 'V20'
	},
	{
		monthIdx: 6,
		month: '07July',
		scpt: 'julyclearscpt',
		name: 'V25',
		title: 'July - Desert - Clear',
		sound: 'V25HEAT'
	},
	{
		month: '07July',
		scpt: 'julycloudyscpt',
		name: 'V25CLOUD',
		title: 'July - Desert - Cloudy',
		sound: 'V25HEAT'
	},
	{
		monthIdx: 7,
		month: '08August',
		scpt: 'augclrscpt',
		name: 'CORAL',
		title: 'August - Aquarius - Clear',
		sound: 'CORAL',
		maxVolume: 0.25,
		remap: {
			0: [0,0,0]
		}
	},
	{
		monthIdx: 8,
		month: '09September',
		scpt: 'SEPTCLRCUMSCPT',
		name: 'V29',
		title: 'September - Seascape - Clear',
		sound: 'V29',
		remap: {
			252: [11,11,11]
		}
	},
	{
		month: '09September',
		scpt: 'SEPTCLDYSCPT',
		name: 'V29CLOUD',
		title: 'September - Seascape - Cloudy',
		sound: 'V29',
		remap: {
			252: [11,11,11]
		}
	},
	{
		monthIdx: 9,
		month: '10October',
		scpt: 'octbegclrscpt',
		name: 'V05AM',
		title: 'Early October - Haunted Ruins - Clear',
		sound: 'V13',
		remap: {
			254: [0,0,0],
			0: [11,11,11]
		}
	},
	{
		month: '10October',
		scpt: 'octendclrscpt',
		name: 'V05AMEND',
		title: 'Late October - Haunted Ruins - Clear',
		sound: 'V13',
		remap: {
			254: [0,0,0],
			0: [11,11,11]
		}
	},
	{
		month: '10October',
		scpt: 'octrainscpt',
		name: 'V05RAIN',
		title: 'Late October - Haunted Ruins - Rain',
		sound: 'V05RAIN',
		remap: {
			254: [0,0,0],
			0: [11,11,11]
		}
	},
	{
		monthIdx: 10,
		month: '11November',
		scpt: 'novclrscpt',
		name: 'V16',
		title: 'November - Mirror Pond - Clear',
		sound: 'V16'
	},
	{
		month: '11November',
		scpt: 'novrainscpt',
		name: 'V16RAIN',
		title: 'November - Mirror Pond - Rain',
		sound: 'V16RAIN'
	},
	// missing 640x480 LBM for december
	{
		monthIdx: 11,
		month: '12December',
		scpt: 'DECCLRSCPT',
		name: 'V12BASIC',
		title: 'December - Winter Manor - Clear',
		sound: 'V13'
	}
];
