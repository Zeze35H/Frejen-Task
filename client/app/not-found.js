import React from 'react';

import ErrorPage from './error/ErrorPage'

export default function Custom404() {
    return <ErrorPage status={404} message='Page not found' />
}