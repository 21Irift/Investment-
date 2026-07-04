import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';

const StatCard = ({ icon, label, value, action, onAction }) => (
  <Card className="p-6 hover:border-purple-500/50 transition cursor-pointer">
    <div className="flex justify-between items-start">
      <div>
        <div className="text-4xl mb-3">{icon}</div>
        <p className="text-gray-400 text-sm mb-2">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      {action && (
        <Button
          size="sm"
          variant="secondary"
          onClick={onAction}
        >
          {action}
        </Button>
      )}
    </div>
  </Card>
);

export default StatCard;
