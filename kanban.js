document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.kanban-card');
  const columns = document.querySelectorAll('.column-content');

  cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
  });

  columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('drop', drop);
  });
});

function dragStart(e) {
  e.target.classList.add('dragging');
}

function dragEnd(e) {
  e.target.classList.remove('dragging');
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  e.target.classList.remove('drag-over');
}

function drop(e) {
  e.preventDefault();
  const column = e.target.closest('.column-content');
  column.classList.remove('drag-over');
  
  const card = document.querySelector('.dragging');
  if (card && column) {
    column.appendChild(card);
    
    // Check if the card was moved to "In Progress"
    const columnHeader = column.closest('.kanban-column').querySelector('.column-header');
    if (columnHeader.textContent === 'In Progress') {
      const cardTitle = card.querySelector('.card-title').textContent;
      
      // Send email notification
      emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: 'rada.fiona@gmail.com',
          card_title: cardTitle,
          from_name: 'Kanban Board',
          message: `The task "${cardTitle}" has been moved to In Progress.`
        }
      ).then(
        function(response) {
          console.log('Email sent successfully:', response);
        },
        function(error) {
          console.error('Failed to send email:', error);
        }
      );
    }
    
    // Check if the card was moved to "Done" and trigger confetti
    if (columnHeader.textContent === 'Done') {
      // Fire multiple confetti bursts
      const end = Date.now() + (3 * 1000);

      // Launch from left edge
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0, y: 0.5 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
      });

      // Launch from right edge
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 1, y: 0.5 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
      });

      // Create continuous rain effect
      const interval = setInterval(function() {
        if (Date.now() > end) {
          return clearInterval(interval);
        }

        confetti({
          particleCount: 50,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });
      }, 100);

      // Fire some confetti from the bottom
      setTimeout(function() {
        confetti({
          particleCount: 150,
          spread: 180,
          origin: { x: 0.5, y: 1 }
        });
      }, 500);
    }
  }
} 