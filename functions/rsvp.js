const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  const data = JSON.parse(event.body);
  console.log("Data received by Netlify function:", data); // Log data for debugging

  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzYbg5Gb6fHHlsRzDoN23NF2rmbPnxasgqZQlpZcpEX5VOJkm5Qmu5uUOZb6ZGNyvqItw/exec';

  try {
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log("Response received from Google Apps Script:", responseData); // Log response for debugging

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error('Error in Netlify function:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch from Google Apps Script' }),
    };
  }
};

