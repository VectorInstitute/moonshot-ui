'use client';
import Link from 'next/link';
import React from 'react';
import { Icon, IconName } from '@/app/components/IconSVG';
import { ActionCard } from '@/app/components/actionCard/actionCard';
import { Banner } from '@/app/components/banner/banner';
import { colors } from '@/app/views/shared-components/customColors';
import {
  resetRedteamModels,
  useAppDispatch,
} from '@/lib/redux';

function EntryBanners() {
  const dispatch = useAppDispatch();
  function handleStartNewRunClick() {
    //dispatch(resetRedteamModels());
  }
  return (
    <div className="grid grid-cols-1 grid-rows-[1rem, 1fr] gap-2">
      <section className="mb-[1%]">
        <Banner
          bannerColor={colors.moongray[700]}
          textColor={colors.white}
          buttonColor={colors.moongray[950]}
          buttonHoverColor={colors.moongray[900]}
          buttonTextColor={colors.white}
          bannerText={
            <span>
              Welcome to the MLHC Hackathon!<br/><br/>Use the Red Teaming utility to assess LLMs for clinically relevant scenarios.
            </span>
          }
          buttonText="Get Started"
          onBtnClick={handleStartNewRunClick}>
          <div style={{ paddingLeft: '0.5rem' }}>
            <Icon
              name={IconName.Asterisk}
              size={50}
            />
          </div>
        </Banner>
      </section>
    </div>
  );
}

export { EntryBanners };
