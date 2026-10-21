import {
	calorieStatus,
	computeDailyCalorieTarget,
	computeMacroTargets,
} from '@elance/contracts'

// Synthetic persona "Camille" for the /maquette design artifact.
// Every figure below is derived from the profile with the real rules from
// @elance/contracts (Mifflin-St Jeor BMR, activity multiplier, macro ratios).
// Nothing here is real user data and nothing is fetched from the API.

export const MOCKUP_TAB_KEYS = ['today', 'weight', 'settings'] as const
export type MockupTabKey = (typeof MOCKUP_TAB_KEYS)[number]

export const MOCKUP_PROFILE = {
	name: 'Camille',
	initial: 'C',
	email: 'camille@example.com',
	height: 170,
	weightKg: 70,
	age: 30,
	sex: 'female',
	activityLevel: 'moderate',
} as const

export const MOCKUP_TARGET_KCAL = computeDailyCalorieTarget(
	{
		height: MOCKUP_PROFILE.height,
		age: MOCKUP_PROFILE.age,
		sex: MOCKUP_PROFILE.sex,
		activityLevel: MOCKUP_PROFILE.activityLevel,
	},
	MOCKUP_PROFILE.weightKg,
)

export const MOCKUP_MACRO_TARGETS = computeMacroTargets(
	MOCKUP_TARGET_KCAL,
	MOCKUP_PROFILE.weightKg,
)

export const MOCKUP_TODAY_INDEX = 2
export const MOCKUP_DAY_LABEL = 'mer. 21 oct.'

export const MOCKUP_MEALS = [
	{
		time: '07:45',
		name: 'Porridge, banane, beurre de cacahuète',
		calories: 430,
		proteinG: 20,
		carbsG: 58,
		fatG: 14,
	},
	{
		time: '12:30',
		name: 'Poulet, riz complet, légumes',
		calories: 620,
		proteinG: 48,
		carbsG: 68,
		fatG: 16,
	},
	{
		time: '20:15',
		name: 'Saumon, patates douces, salade',
		calories: 640,
		proteinG: 44,
		carbsG: 56,
		fatG: 24,
	},
] as const

export type MockupWeekDay = {
	dayOfMonth: number
	kcal: number
	future?: boolean
}

// Monday to Sunday; today (Wednesday) is at index 2, later days are future.
export const MOCKUP_WEEK_DAYS: readonly MockupWeekDay[] = [
	{ dayOfMonth: 19, kcal: 2250 },
	{ dayOfMonth: 20, kcal: 2315 },
	{ dayOfMonth: 21, kcal: 1690 },
	{ dayOfMonth: 22, kcal: 0, future: true },
	{ dayOfMonth: 23, kcal: 0, future: true },
	{ dayOfMonth: 24, kcal: 0, future: true },
	{ dayOfMonth: 25, kcal: 0, future: true },
]

export const MOCKUP_WEEK_RANGE = 'du 19/10 au 25/10'

const loggedWeekDays = MOCKUP_WEEK_DAYS.filter(day => !day.future)

export const MOCKUP_WEEK_STATS = {
	averageKcal: Math.round(
		loggedWeekDays.reduce((total, day) => total + day.kcal, 0) /
			loggedWeekDays.length,
	),
	balancedDays: loggedWeekDays.filter(
		day => calorieStatus(day.kcal, MOCKUP_TARGET_KCAL) === 'balance',
	).length,
	loggedDays: loggedWeekDays.length,
	weightDeltaKg: -0.6,
}

// Newest first, as the weight page lists and charts them.
export const MOCKUP_WEIGH_INS = [
	{ entryDate: '2026-10-21', weight: 69.4 },
	{ entryDate: '2026-10-19', weight: 69.6 },
	{ entryDate: '2026-10-16', weight: 69.8 },
	{ entryDate: '2026-10-12', weight: 70.0 },
	{ entryDate: '2026-10-07', weight: 70.3 },
	{ entryDate: '2026-10-02', weight: 70.5 },
	{ entryDate: '2026-09-27', weight: 70.8 },
	{ entryDate: '2026-09-22', weight: 71.2 },
] as const

export const MOCKUP_API_TOKEN = 'elance_live_8f2c9a1e4b6d7f0a3c5b8d2e1f6a9c0'
