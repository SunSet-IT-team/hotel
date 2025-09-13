import type { RootState } from '../../../app/store'
import type { ISODate } from './types'

export const selectSearchForm = (s: RootState) => s.searchForm
export const selectValues = (s: RootState) => s.searchForm.values
export const selectSubmitting = (s: RootState) => s.searchForm.isSubmitting

const ts = (d: ISODate) => new Date(d as string).getTime()

export const selectNights = (s: RootState) => {
	const { checkIn, checkOut } = s.searchForm.values
	if (!checkIn || !checkOut) return 0
	return Math.max(0, Math.round((ts(checkOut) - ts(checkIn)) / 86_400_000))
}

export const selectIsValid = (s: RootState) => {
	const v = s.searchForm.values
	return (
		!!v.destination &&
		!!v.checkIn &&
		!!v.checkOut &&
		v.adults >= 1 &&
		selectNights(s) > 0
	)
}
