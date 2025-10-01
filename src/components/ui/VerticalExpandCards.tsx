import React from 'react';

interface CardData {
  id: number;
  title: string;
  institution: string;
  duration: string;
  detail?: string;
}

interface VerticalExpandCardsProps {
  educationData: CardData[];
  certificationData: CardData[];
  className?: string;
}

const VerticalExpandCards: React.FC<VerticalExpandCardsProps> = ({
  educationData,
  certificationData,
  className = ''
}) => {
  return (
    <div className={`horizontal-expand-container ${className}`}>
      {/* Education Card */}
      <div className="expand-card">
        <span className="expand-card-title font-bebas lg:text-4xl">Education</span>
        <div className="expand-card-content">
          <div className="expand-content-header">
            <div className="expand-content-title font-bebas">Education</div>
          </div>
          {educationData.map((item) => (
            <div key={item.id} className="expand-content-item">
              <div className="expand-item-title font-sansita">{item.title}</div>
              <div className="expand-item-institution font-sansita">{item.institution}</div>
              <div className="expand-item-details">
                <span className="expand-item-duration font-sansita">{item.duration}</span>
                {item.detail && <span className="expand-item-detail font-sansita">{item.detail}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Card */}
      <div className="expand-card">
        <span className="expand-card-title font-bebas lg:text-4xl">Certifications</span>
        <div className="expand-card-content">
          <div className="expand-content-header">
            <div className="expand-content-title font-bebas">Certifications</div>
          </div>
          {certificationData.map((item) => (
            <div key={item.id} className="expand-content-item">
              <div className="expand-item-title font-sansita">{item.title}</div>
              <div className="expand-item-institution font-sansita">{item.institution}</div>
              <div className="expand-item-details">
                <span className="expand-item-duration font-sansita">{item.duration}</span>
                {item.detail && <span className="expand-item-detail font-sansita">{item.detail}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalExpandCards;
