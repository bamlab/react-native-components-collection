import zxcvbn from 'zxcvbn';

const computeStrength = (password = '') => {
  const { score, feedback: { warning, suggestions } } = zxcvbn(password);

  return {
    score,
    warning,
    suggestions,
  };
};

export default computeStrength;
