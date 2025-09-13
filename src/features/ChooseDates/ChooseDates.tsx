'use client'

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux'
import { Button, Calendar, Typography } from '@/shared/ui'
import { Box } from '@/shared/ui/Box'
import type { DateRange } from '@/shared/ui/Calendar'
import { setDates } from '@/widgets/search-form/model'
import { toISODate } from '@/widgets/search-form/model/types'
import { useEffect, useState } from 'react'
import styles from './ChooseDates.module.scss'

export const ChooseDates = () => {
	const dispatch = useAppDispatch()
	const { checkIn, checkOut } = useAppSelector(state => state.searchForm.values)
	const [open, setOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [selectedRange, setSelectedRange] = useState<DateRange>({
		startDate: checkIn ? new Date(checkIn) : null,
		endDate: checkOut ? new Date(checkOut) : null,
	})

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkIsMobile()
		window.addEventListener('resize', checkIsMobile)

		return () => window.removeEventListener('resize', checkIsMobile)
	}, [])

	const formatDate = (date: Date | null) => {
		if (!date) return ''
		return date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
	}

	// Функция для нормализации даты (убираем время)
	const normalizeDate = (dateString: string) => {
		const date = new Date(dateString)
		date.setHours(0, 0, 0, 0) // Устанавливаем время в 00:00:00.000
		return date
	}

	const getCheckInLabel = () => {
		if (!checkIn) return 'Дата заезда'
		return formatDate(selectedRange.startDate)
	}

	const getCheckOutLabel = () => {
		if (!checkOut) return 'Дата выезда'
		return formatDate(selectedRange.endDate)
	}

	const handleOpenCalendar = () => {
		// При открытии календаря всегда синхронизируем с актуальным Redux состоянием
		// Нормализуем даты, чтобы время было одинаковым
		setSelectedRange({
			startDate: checkIn ? normalizeDate(checkIn) : null,
			endDate: checkOut ? normalizeDate(checkOut) : null,
		})
		setOpen(v => !v)
	}

	const handleDateRangeChange = (dateRange: DateRange) => {
		setSelectedRange(dateRange)

		// Когда пользователь нажимает "Применить" в календаре,
		// Calendar вызывает onChange с финальным диапазоном
		if (dateRange.startDate && dateRange.endDate) {
			dispatch(
				setDates({
					checkIn: toISODate(dateRange.startDate),
					checkOut: toISODate(dateRange.endDate),
				})
			)
			setOpen(false)
		}
	}

	const borderRadius = isMobile ? '12px' : '24px'

	return (
		<div className={styles.root}>
			<div className={styles.buttonsContainer}>
				<Button
					type='button'
					variant='white'
					size='big'
					className={styles.trigger}
					onClick={handleOpenCalendar}
					style={{ borderRadius }}
				>
					<Typography as='span' variant='h2' color='dark'>
						{getCheckInLabel()}
					</Typography>
				</Button>

				<Button
					type='button'
					variant='white'
					size='big'
					className={styles.trigger}
					onClick={handleOpenCalendar}
					style={{ borderRadius }}
				>
					<Typography as='span' variant='h2' color='dark'>
						{getCheckOutLabel()}
					</Typography>
				</Button>
			</div>

			{open && (
				<Box
					as='div'
					paddingLeft={isMobile ? 30 : 25}
					paddingRight={isMobile ? 19 : 25}
					paddingTop={isMobile ? 22 : 19}
					paddingBottom={isMobile ? 14 : 19}
					className={styles.panel}
				>
					<Calendar
						key={`${checkIn}-${checkOut}-${Date.now()}`} // Уникальный key для принудительного пересоздания
						language='ru'
						value={selectedRange}
						onChange={handleDateRangeChange}
						className={styles.calendar}
					/>
				</Box>
			)}
		</div>
	)
}
