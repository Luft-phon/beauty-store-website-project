/**
 * Booking API Layer
 * 
 * This file provides an abstraction layer for booking operations.
 * Currently using mock implementation, designed for easy backend integration.
 */

import { Booking } from '../../types';

/**
 * Create a new booking
 * @param booking - Booking data without ID
 * @returns Promise<Booking>
 */
export const createBooking = async (
  booking: Omit<Booking, 'id'>
): Promise<Booking> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/bookings`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(booking)
  // });
  // return response.json();
  
  const newBooking: Booking = {
    ...booking,
    id: `booking_${Date.now()}`
  };
  
  // Mock: Store in localStorage for demo purposes
  const existingBookings = JSON.parse(
    localStorage.getItem('bookings') || '[]'
  ) as Booking[];
  
  existingBookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(existingBookings));
  
  return Promise.resolve(newBooking);
};

/**
 * Get all bookings (Admin only)
 * @returns Promise<Booking[]>
 */
export const getAllBookings = async (): Promise<Booking[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/bookings`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return response.json();
  
  // Mock: Retrieve from localStorage
  const bookings = JSON.parse(
    localStorage.getItem('bookings') || '[]'
  ) as Booking[];
  
  return Promise.resolve(bookings);
};

/**
 * Get a single booking by ID
 * @param id - Booking ID
 * @returns Promise<Booking | null>
 */
export const getBookingById = async (id: string): Promise<Booking | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
  // return response.json();
  
  const bookings = JSON.parse(
    localStorage.getItem('bookings') || '[]'
  ) as Booking[];
  
  const booking = bookings.find(b => b.id === id);
  return Promise.resolve(booking || null);
};

/**
 * Update booking status
 * @param id - Booking ID
 * @param updates - Partial booking data
 * @returns Promise<Booking>
 */
export const updateBooking = async (
  id: string,
  updates: Partial<Booking>
): Promise<Booking> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(updates)
  // });
  // return response.json();
  
  const bookings = JSON.parse(
    localStorage.getItem('bookings') || '[]'
  ) as Booking[];
  
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) throw new Error('Booking not found');
  
  bookings[index] = { ...bookings[index], ...updates };
  localStorage.setItem('bookings', JSON.stringify(bookings));
  
  return Promise.resolve(bookings[index]);
};

/**
 * Delete a booking
 * @param id - Booking ID
 * @returns Promise<void>
 */
export const deleteBooking = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // TODO: Replace with actual API call
  // await fetch(`${API_BASE_URL}/bookings/${id}`, {
  //   method: 'DELETE'
  // });
  
  const bookings = JSON.parse(
    localStorage.getItem('bookings') || '[]'
  ) as Booking[];
  
  const filtered = bookings.filter(b => b.id !== id);
  localStorage.setItem('bookings', JSON.stringify(filtered));
  
  return Promise.resolve();
};
