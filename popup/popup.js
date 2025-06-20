// document.getElementById('qa-form').addEventListener('submit', async (e) => {
//   e.preventDefault();
  
//   const question = document.getElementById('question').value;
//   const spinner = document.getElementById('spinner');
//   const responseContainer = document.getElementById('response-container');
//   const responseElement = document.getElementById('response');
  
//   spinner.classList.remove('hidden');
//   responseContainer.classList.add('hidden');
  
//   try {
//     // Get the current Coursera tab
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
//     if (!tab.url.includes('coursera.org')) {
//       throw new Error('Please navigate to a Coursera course page');
//     }
    
//     // Send data to your Flask backend
//     const response = await fetch('http://127.0.0.1:5000/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: `course_url=${encodeURIComponent(tab.url)}&question=${encodeURIComponent(question)}`
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to get response from server');
//     }
    
//     const data = await response.text();
//     const parser = new DOMParser();
//     const htmlDoc = parser.parseFromString(data, 'text/html');
//     const answer = htmlDoc.querySelector('p')?.textContent || 'No answer found';
    
//     responseElement.textContent = answer;
//     responseContainer.classList.remove('hidden');
//   } catch (error) {
//     responseElement.textContent = `Error: ${error.message}`;
//     responseContainer.classList.remove('hidden');
//   } finally {
//     spinner.classList.add('hidden');
//   }
// });



document.getElementById('qa-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const question = document.getElementById('question').value.trim();
  const spinner = document.getElementById('spinner');
  const responseContainer = document.getElementById('response-container');
  const responseElement = document.getElementById('response');
  const askBtn = document.getElementById('askBtn');
  
  if (!question) return;
  
  // Update button state
  askBtn.disabled = true;
  askBtn.querySelector('.button-text').textContent = 'Processing...';
  spinner.classList.remove('hidden');
  responseContainer.classList.add('hidden');
  
  try {
    // Get the current Coursera tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.url.includes('coursera.org')) {
      throw new Error('Please navigate to a Coursera course page to use this feature');
    }
    
    // Send data to your Flask backend
    const response = await fetch('http://127.0.0.1:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `course_url=${encodeURIComponent(tab.url)}&question=${encodeURIComponent(question)}`
    });
    
    if (!response.ok) {
      throw new Error('Failed to get response from server. Please try again.');
    }
    
    const data = await response.text();
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, 'text/html');
    const answer = htmlDoc.querySelector('p')?.textContent || 'No answer found in the response.';
    
    responseElement.textContent = answer;
    responseContainer.classList.remove('hidden');
  } catch (error) {
    responseElement.textContent = `Error: ${error.message}`;
    responseContainer.classList.remove('hidden');
  } finally {
    spinner.classList.add('hidden');
    askBtn.disabled = false;
    askBtn.querySelector('.button-text').textContent = 'Get Answer';
  }
});