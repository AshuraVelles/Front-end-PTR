import React from 'react';

const ResetPassword: React.FC = () => {
  return (
    <div>
      <h2>Redefinir Senha</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <button type="submit">Enviar link de redefinição de senha</button>
      </form>
    </div>
  );
};

export default ResetPassword;
