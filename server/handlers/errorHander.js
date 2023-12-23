export function handleError(message, statusCode = 500) {
    // Create a new error object with the provided message
    const error = new Error(message);

    // Attach a status code to the error object
    error.statusCode = statusCode;

    // Log the error message to the console
    console.error(`Error: ${error.message}, Status Code: ${error.statusCode}`);

    return error;
}

