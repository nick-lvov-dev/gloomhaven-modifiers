import { HeroVm } from '../HeroVm';
import { Hero } from 'src/core/Hero/Hero';
import { mapModifierIdsToModifiers } from './mapModifierIdsToModifiers.helper';

export const mapVmToHero = (vm: HeroVm) =>
  new Hero(vm.heroClass, vm.name, mapModifierIdsToModifiers(vm.heroClass, vm.defaultModifiers), {
    upgrades: vm.upgrades,
    drawn: mapModifierIdsToModifiers(vm.heroClass, vm.drawn),
    currentModifiers: mapModifierIdsToModifiers(vm.heroClass, vm.currentModifiers),
    remainingModifiers: mapModifierIdsToModifiers(vm.heroClass, vm.remainingModifiers),
  });
