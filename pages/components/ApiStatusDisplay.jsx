import React from "react";
import PropTypes from "prop-types";

export default function ApiStatusDisplay({ data, error, isLoading }) {
  if (isLoading) return <h2>Carregando...</h2>;
  if (error) return <h2>Erro ao carregar o status da API.</h2>;
  if (data)
    return (
      <section className="api-status-section">
        <style>
          {`
            .api-status-section {
              border: 1px solid #ccc;
              border-radius: 8px;
              padding: 16px;
              background: #f9f9f9;
              margin-top: 16px;
            }
            .api-status-section .status-header {
              display: flex;
              gap: 8px;
              align-items: baseline;
            }
            .api-status-section .status-section {
              margin-top: 16px;
              background: #e3e3ff;
              border-radius: 6px;
              padding: 8px;

              div {
                display: flex;
                align-items: baseline;
                gap: 8px;
              }
            }
          `}
        </style>
        <div className="status-header">
          <h2>Atualizado em:</h2>
          <span>{new Date(data.updated_at).toLocaleString("pt-BR")}</span>
        </div>
        <div className="status-section">
          <h2>Status do Banco de Dados: </h2>
          <div className="status">
            <h3>Conexões máximas:</h3>
            <span>{data.dependencies.database.max_connections}</span>
          </div>
          <div>
            <h3>Conexões abertas:</h3>
            <span>{data.dependencies.database.openedConnections}</span>
          </div>
          <div>
            <h3>Versão do banco de dados:</h3>
            <span>{data.dependencies.database.version}</span>
          </div>
        </div>
      </section>
    );
  return <h2>Nenhum dado disponível.</h2>;
}

ApiStatusDisplay.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  isLoading: PropTypes.bool,
};
