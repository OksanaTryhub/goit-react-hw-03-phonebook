import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  distance: '10px',
  opacity: 1,
  warning: {
    background: '#ffa229',
    textColor: '#645D55',
    notiflixIconColor: '#645D55',
  },
});

export default function warningMessage(name) {
  Notiflix.Notify.warning(name + ' is already in contacts');
}
